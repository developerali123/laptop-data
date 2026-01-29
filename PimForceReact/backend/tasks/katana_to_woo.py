#!/usr/bin/env python3
"""
KatanaPIM -> WooCommerce sync (Python)

- Reads active integrations from database table `integrations`
- For each integration, fetches products from KatanaPIM
- Upserts into WooCommerce using SKU as the unique identifier

Environment variables (defaults shown):
  DB_CONNECTION=postgres   # postgres or mysql
  DB_HOST=127.0.0.1
  DB_PORT=5432             # 5432 for postgres, 3306 for mysql
  DB_USERNAME=postgres
  DB_PASSWORD=1234
  DB_DATABASE=PIMFORCE
  DB_SSLMODE=prefer        # postgres only
  SSL_VERIFY=true            # Set to false to disable HTTPS verification (dev only)
  REQUEST_TIMEOUT=120        # HTTP timeout in seconds

Usage examples:
  python3 scripts/katana_to_woo.py --dry-run
  python3 scripts/katana_to_woo.py --integration-id 1

Notes:
- The script supports two possible integration schemas:
  1) Column-based (e.g., `katana_pim_url`, `webshop_url`, ...)
  2) JSON column-based (`apiDetails`, `store_details`, ...)
- The unique identifier is expected to be SKU (`SKU-1`).
"""

from __future__ import annotations

import os
import sys
import json
import time
import argparse
import logging
from typing import Any, Dict, Iterable, List, Optional, Tuple
from datetime import datetime
import re
from urllib.parse import urlparse

# Optional .env support
try:
	from dotenv import load_dotenv
	load_dotenv()
except Exception:
	pass

import psycopg
from psycopg.rows import dict_row
import requests


# ---------------------- Logging ----------------------

def get_logger() -> logging.Logger:
	logger = logging.getLogger("katana_to_woo")
	if not logger.handlers:
		logger.setLevel(logging.INFO)
		handler = logging.StreamHandler(sys.stdout)
		handler.setFormatter(logging.Formatter("[%(asctime)s] %(levelname)s: %(message)s"))
		logger.addHandler(handler)
	return logger


log = get_logger()


# ---------------------- Config / DB ----------------------

# Updated get_db_conn for PostgreSQL only
def get_db_conn():
    """Create a DB connection for Postgres based on environment variables."""
    host = os.environ.get("DB_HOST", "127.0.0.1")
    user = os.environ.get("DB_USERNAME", "postgres")
    password = os.environ.get("DB_PASSWORD", "1234")
    dbname = os.environ.get("DB_DATABASE", "PIMFORCE")
    port = int(os.environ.get("DB_PORT", "5432"))
    sslmode = os.environ.get("DB_SSLMODE", "prefer")
    conninfo = f"host={host} port={port} user={user} password={password} dbname={dbname} sslmode={sslmode}"
    # Log without leaking password
    safe_conninfo = f"host={host} port={port} user={user} dbname={dbname} sslmode={sslmode}"
    log.info(f"Connecting to database (PostgreSQL): {safe_conninfo}")
    return psycopg.connect(conninfo)

# --- Patch: Always use Django DATABASE_URL for PostgreSQL if present ---
db_url = os.environ.get("DATABASE_URL")
if db_url:
    parsed = urlparse(db_url)
    if parsed.scheme.startswith("postgres"):
        os.environ["DB_CONNECTION"] = "postgres"
        os.environ["DB_HOST"] = parsed.hostname or "localhost"
        os.environ["DB_PORT"] = str(parsed.port or 5432)
        os.environ["DB_USERNAME"] = parsed.username or "postgres"
        os.environ["DB_PASSWORD"] = parsed.password or ""
        os.environ["DB_DATABASE"] = parsed.path.lstrip("/")
        # Optionally handle sslmode in query
        if parsed.query:
            match = re.search(r'sslmode=([^&]+)', parsed.query)
            if match:
                os.environ["DB_SSLMODE"] = match.group(1)


# Updated _open_dict_cursor for PostgreSQL only
def _open_dict_cursor(conn):
    """Return a cursor that yields dict rows for Postgres connections."""
    return conn.cursor(row_factory=dict_row)


def fetch_integrations(conn, integration_id: Optional[int]) -> List[Dict[str, Any]]:
	# Avoid Postgres schema-qualification so the query works on MySQL too
	query = "SELECT * FROM integrations WHERE status = 'active'"
	params: Tuple[Any, ...] = ()
	if integration_id is not None:
		query += " AND id = %s"
		params = (integration_id,)
	with _open_dict_cursor(conn) as cur:
		cur.execute(query, params)
		rows = cur.fetchall()
	return rows


# ---------------------- Utilities ----------------------

def env_bool(name: str, default: bool) -> bool:
	val = os.environ.get(name)
	if val is None:
		return default
	return str(val).lower() in {"1", "true", "yes", "on"}


def get_path(data: Any, path: str, default: Any = None) -> Any:
	"""Nested dict list lookup by dot path, e.g. 'a.b.0.c'"""
	try:
		cur = data
		for seg in path.split('.'):
			if isinstance(cur, list):
				idx = int(seg)
				cur = cur[idx]
			elif isinstance(cur, dict):
				if seg not in cur:
					return default
				cur = cur[seg]
			else:
				return default
		return cur
	except Exception:
		return default


def coalesce(*values: Any) -> Any:
	for v in values:
		if v not in (None, ""):
			return v
	return None


def parse_json_field(val, default):
    if isinstance(val, str):
        try:
            return json.loads(val)
        except Exception:
            return default
    return val if val is not None else default


# ---------------------- Integration mapping ----------------------

def extract_integration_config(row: Dict[str, Any]) -> Dict[str, Any]:
	"""Normalize integration row into a common config dict."""
	log.debug(f"Extracting integration config for id={row.get('id')}")

	api_details = parse_json_field(row.get("api_data"), {})

	store_details = parse_json_field(row.get("store_data"), {})

	unique_identifier = parse_json_field(row.get("unique_identifier"), {})

	field_mappings = parse_json_field(row.get("fields_mapping_data"), {})
	seo_data = parse_json_field(row.get("seo_data"), {})
	specifications = parse_json_field(row.get("specifications"), [])

	cfg = {
		"id": row.get("id"),
		"katana_url": coalesce(row.get("katanaPimUrl"), api_details.get("katanaPimUrl")),
		"katana_api_key": coalesce(api_details.get("katanaPimApiKey"), api_details.get("katanaApiKey")),
		"webshop_url": coalesce(row.get("webshopUrl"), api_details.get("webshopUrl")),
		"woo_key": coalesce(api_details.get("wooCommerceApiKey"), api_details.get("wooApiKey")),
		"woo_secret": coalesce(api_details.get("wooCommerceApiSecret"), api_details.get("wooApiSecret")),
		"selected_store": store_details,
		"store_id": store_details.get("Id"),
		"field_mappings": field_mappings,
		"seo_data": seo_data,
		"specifications": specifications,
		"unique_identifier": (unique_identifier.get("identifier") if isinstance(unique_identifier, dict) else unique_identifier) or "SKU-1",
	}
	# Log sanitized configuration (no secrets)
	try:
		_sanitized = {k: v for k, v in cfg.items() if k not in {"woo_key", "woo_secret", "katana_api_key", "field_mappings", "seo_data", "specifications", "selected_store"}}
		log.debug(f"Configuration: {_sanitized}")
	except Exception:
		pass

	# Ensure Katana endpoint ends with /api/v1/product
	if cfg["katana_url"]:
		base = cfg["katana_url"].rstrip('/')
		if not base.endswith('/api/v1/product'):
			base = base + '/api/v1/product'
		cfg["katana_url"] = base

	return cfg


# ---------------------- KatanaPIM ----------------------

def katana_session(api_key: str) -> requests.Session:
	s = requests.Session()
	s.headers.update({"Accept": "application/json", "ApiKey": api_key})
	verify = env_bool("SSL_VERIFY", True)
	s.verify = verify
	return s


def fetch_katana_products(cfg: Dict[str, Any], timeout: int) -> List[Dict[str, Any]]:
	if not cfg.get("katana_url") or not cfg.get("katana_api_key"):
		raise RuntimeError("Missing KatanaPIM URL or API key in integration config")

	s = katana_session(cfg["katana_api_key"])
	url = cfg["katana_url"]
	page_index = 0
	page_size = 50
	all_items: List[Dict[str, Any]] = []

	while True:
		# Pagination parameters
		params = {"PageIndex": page_index, "PageSize": page_size}
		# StoreId can come as a raw id or inside selected_store dict
		store_val = cfg.get("store_id")
		if not store_val:
			selected_store = cfg.get("selected_store")
			if isinstance(selected_store, dict):
				store_val = selected_store.get("Id") or selected_store.get("id")
			else:
				store_val = selected_store
		if store_val is not None:
			try:
				params["StoreId"] = int(store_val)
			except Exception:
				log.debug("StoreId present but not an int; skipping explicit cast")

		log.info(f"Fetching Katana products page={page_index}")
		resp = s.get(url, params=params, timeout=timeout)
		if resp.status_code != 200:
			raise RuntimeError(f"Katana GET failed: {resp.status_code} {resp.text[:500]}")
		js = resp.json()
		items = js.get("Items") or js.get("items") or []
		if not items:
			break
		all_items.extend(items)
		page_index += 1
		total_pages = int(js.get("TotalPages") or js.get("totalPages") or 0)
		if total_pages and page_index >= total_pages:
			break
		if len(items) < page_size:
			break

	log.info(f"Fetched {len(all_items)} product(s) from Katana")
	return all_items


# ---------------------- WooCommerce ----------------------

def woo_session(key: str, secret: str) -> requests.Session:
	s = requests.Session()
	s.auth = (key, secret)
	s.headers.update({"Accept": "application/json", "Content-Type": "application/json"})
	verify = env_bool("SSL_VERIFY", True)
	s.verify = verify
	return s


def find_woo_product_by_sku(s: requests.Session, base_url: str, sku: str, timeout: int) -> Optional[Dict[str, Any]]:
	url = base_url.rstrip('/') + '/wp-json/wc/v3/products'
	resp = s.get(url, params={"sku": sku}, timeout=timeout)
	if resp.status_code == 200:
		arr = resp.json()
		return arr[0] if isinstance(arr, list) and arr else None
	return None


def create_woo_product(s: requests.Session, base_url: str, product: Dict[str, Any], timeout: int) -> Dict[str, Any]:
	url = base_url.rstrip('/') + '/wp-json/wc/v3/products'
	log.debug("Creating Woo product")
	resp = s.post(url, data=json.dumps(product), timeout=timeout)
	if resp.status_code not in (200, 201):
		raise RuntimeError(f"Woo create failed: {resp.status_code} {resp.text[:500]}")
	return resp.json()


def update_woo_product(s: requests.Session, base_url: str, product_id: int, product: Dict[str, Any], timeout: int) -> Dict[str, Any]:
	url = base_url.rstrip('/') + f'/wp-json/wc/v3/products/{product_id}'
	log.debug(f"Updating Woo product id={product_id}")
	resp = s.put(url, data=json.dumps(product), timeout=timeout)
	if resp.status_code not in (200, 201):
		raise RuntimeError(f"Woo update failed: {resp.status_code} {resp.text[:500]}")
	return resp.json()


# ---------------------- Mapping ----------------------

from typing import Set


def _allowed_woo_fields_from_mapping(field_mappings: Any) -> Tuple[Set[str], Dict[str, bool]]:
	"""Normalize mapping input into a set of Woo API keys to include.

	Accepts either a dict mapping (katana_field -> woo_field_label) or a list of
	objects with keys 'field' and 'value'. Empty 'value' entries are ignored.

	Returns (allowed_keys, flags) where flags include booleans for optional
	feature gates like gtin, mpn, manufacturer, taxcategory, slug.
	"""
	allowed: Set[str] = set()
	flags: Dict[str, bool] = {
		"gtin": False,
		"mpn": False,
		"manufacturer": False,
		"taxcategory": False,
		"slug": False,
	}

	def add_from_label(label: str) -> None:
		lab = (label or "").strip()
		if not lab:
			return
		lab_norm = lab.replace(" ", "").replace("_", "").lower()
		# Crosswalk from mapping labels to Woo payload keys
		if lab_norm in {"sku", "sku-1", "sku1"}:
			allowed.add("sku")
		elif lab_norm in {"name", "title"}:
			allowed.add("name")
		elif lab_norm in {"shortdescription", "short_desc"}:
			allowed.add("short_description")
		elif lab_norm in {"longdescription", "fulldescription", "description"}:
			allowed.add("description")
		elif lab_norm == "slug":
			allowed.add("slug"); flags["slug"] = True
		elif lab_norm in {"price", "regularprice", "oldprice"}:
			allowed.add("regular_price")
		elif lab_norm in {"specialprice", "saleprice"}:
			allowed.add("sale_price")
		elif lab_norm in {"stockquantity", "stock", "quantity"}:
			allowed.add("stock_quantity")
		elif lab_norm == "gtin":
			flags["gtin"] = True
		elif lab_norm == "mpn":
			flags["mpn"] = True
		elif lab_norm in {"manufacturer", "brand"}:
			flags["manufacturer"] = True
		elif lab_norm in {"taxcategory", "taxclass"}:
			allowed.add("tax_class"); flags["taxcategory"] = True
		# Dimensions
		elif lab_norm == "weight":
			allowed.add("weight")
		elif lab_norm in {"length", "width", "height"}:
			allowed.add("dimensions")
		# Ignore unknown labels silently
		return

	if isinstance(field_mappings, dict):
		for _kat, woo_label in field_mappings.items():
			if woo_label:
				add_from_label(str(woo_label))
	elif isinstance(field_mappings, list):
		for entry in field_mappings:
			if not isinstance(entry, dict):
				continue
			val = entry.get("value")
			if val:
				add_from_label(str(val))

	return allowed, flags

def derive_unique_identifier(product: Dict[str, Any], identifier_key: str) -> Optional[str]:
	"""Resolve the configured unique identifier value from the product.

	Supports explicit dot-paths (e.g. "TextFieldsModel.SKU") and tries common
	Katana locations with case/separator variations for simple keys (e.g. "EAN").
	"""
	key = (identifier_key or "").strip()
	if not key:
		return None
	# Try a series of likely paths based on the provided key
	candidate_paths = [
		key,
		f"TextFieldsModel.{key}",
		f"TextFields.{key}",
		key.replace("-", ""),
		key.replace(" ", ""),
		f"TextFieldsModel.{key.replace('-', '')}",
		f"TextFields.{key.replace('-', '')}",
		key.upper(),
		f"TextFieldsModel.{key.upper()}",
		f"TextFields.{key.upper()}",
		key.title(),
		f"TextFieldsModel.{key.title()}",
		f"TextFields.{key.title()}",
	]
	for path in candidate_paths:
		val = get_path(product, path)
		if val not in (None, ""):
			return str(val)
	return None


def get_mapped_field_value(product: Dict[str, Any], field_mappings: Dict[str, str], woo_field: str) -> Any:
	"""Get field value from product using field mappings configuration.

	Supports dict mappings (katana_field -> woo_field_label). For list-based
	mappings, no direct katana field can be derived, so returns None.
	"""
	if not field_mappings:
		return None

	# Find the Katana field name that maps to this WooCommerce field
	katana_field = None
	if isinstance(field_mappings, dict):
		for katana_key, woo_key in field_mappings.items():
			if woo_key == woo_field:
				katana_field = katana_key
				break
	else:
		# For list or other types, we cannot resolve a katana field mapping here
		return None

	if not katana_field:
		return None

	# Try to get the value from common Katana field locations
	value = (
		get_path(product, f'TextFieldsModel.{katana_field}')
		or get_path(product, f'TextFields.{katana_field}')
		or get_path(product, katana_field)
		or product.get(katana_field)
	)
	
	return value


def map_product_to_woo(cfg: Dict[str, Any], product: Dict[str, Any]) -> Dict[str, Any]:
    log.debug("Mapping product to WooCommerce payload")
    field_mappings = cfg.get('field_mappings', {})
    allowed_woo_fields, map_flags = _allowed_woo_fields_from_mapping(field_mappings)

    # Always required for unique identifier
    unique_identifier = cfg.get('unique_identifier') or 'SKU-1'
    sku = derive_unique_identifier(product, unique_identifier) or ''

    # Build the full WooCommerce product dict as before
    mapped_name = get_mapped_field_value(product, field_mappings, 'Title')
    name = mapped_name or get_path(product, 'TextFieldsModel.Name') or str(product.get('Id', 'Unknown Product'))
    mapped_sku = get_mapped_field_value(product, field_mappings, 'SKU')
    # Only use mapped SKU if unique identifier could not be derived
    if not sku:
        sku = mapped_sku or ''
    description = get_path(product, 'TextFieldsModel.FullDescription') or ''
    short_desc = get_path(product, 'TextFieldsModel.ShortDescription') or ''
    regular_price = get_path(product, 'Prices.CurrentPriceBookItem.Price')
    if not isinstance(regular_price, (int, float, str)):
        regular_price = get_path(product, 'Prices.PriceBookItems.0.Price')
    sale_price = get_path(product, 'Prices.SpecialPrice')
    stock_qty = int(get_path(product, 'Stock.TotalStock') or 0)
    weight = get_path(product, 'Dimensions.Weight')
    length = get_path(product, 'Dimensions.Length')
    width = get_path(product, 'Dimensions.Width')
    height = get_path(product, 'Dimensions.Height')
    categories = []
    for cat in get_path(product, 'Collections.Categories', []) or []:
        if isinstance(cat, dict):
            name_val = cat.get('Name')
            if name_val:
                categories.append({"name": str(name_val)})
        else:
            categories.append({"name": str(cat)})
    specs = cfg.get("specifications")
    if specs:
        if isinstance(specs, str):
            try:
                specs = json.loads(specs)
            except Exception:
                specs = []
        if isinstance(specs, dict):
            specs = [specs]
        if isinstance(specs, list):
            product_specs = get_path(product, "Collections.Specs", []) or []
            for spec in specs:
                if not isinstance(spec, dict):
                    continue
                spec_id = spec.get("Id")
                for prod_spec in product_specs:
                    if isinstance(prod_spec, dict) and prod_spec.get("Id") == spec_id:
                        category_obj = {
                            "id": spec_id,
                            "name": spec.get("Name"),
                            "slug": spec.get("Code"),
                        }
                        if category_obj not in categories:
                            categories.append(category_obj)
    attributes = []
    gtin = get_mapped_field_value(product, field_mappings, 'GTIN') or get_path(product, 'TextFieldsModel.Gtin')
    if gtin and (not allowed_woo_fields or map_flags.get("gtin")):
        attributes.append({"name": "GTIN", "visible": True, "variation": False, "options": [str(gtin)]})
    for spec in get_path(product, 'Collections.Specs', []) or []:
        if isinstance(spec, dict):
            name_val = spec.get('Name')
            option = spec.get('OptionName')
            if name_val and option:
                attributes.append({
                    "name": str(name_val),
                    "visible": True,
                    "variation": False,
                    "options": [str(option)],
                })
    meta_data = []
    if 'Id' in product:
        meta_data.append({"key": "katana_id", "value": str(product['Id'])})
    if 'ExternalKey' in product:
        meta_data.append({"key": "katana_external_key", "value": str(product['ExternalKey'])})
    if gtin and (not allowed_woo_fields or map_flags.get("gtin")):
        meta_data.append({"key": "gtin", "value": str(gtin)})
    # Optional meta based on mappings
    if map_flags.get("mpn"):
        mpn = get_path(product, 'TextFieldsModel.Mpn') or get_path(product, 'TextFields.Mpn')
        if mpn:
            meta_data.append({"key": "mpn", "value": str(mpn)})
    if map_flags.get("manufacturer"):
        manufacturer = get_path(product, 'TextFieldsModel.Manufacturer') or get_path(product, 'TextFields.Manufacturer')
        if manufacturer:
            meta_data.append({"key": "manufacturer", "value": str(manufacturer)})

    # Build the full product dict
    # Slug: only computed if requested by mapping to avoid altering behavior
    slug_val = None
    if map_flags.get("slug"):
        slug_val = get_path(product, 'TextFieldsModel.Slug') or get_path(product, 'TextFields.Slug')
        if not slug_val and name:
            slug_val = re.sub(r"[^a-z0-9-]", "-", str(name).strip().lower())

    full_woo_product = {
        "name": str(name),
        "type": "simple",
        "status": "publish",
        "catalog_visibility": "visible",
        "description": str(description),
        "short_description": str(short_desc),
        "sku": str(sku),
        "regular_price": str(regular_price) if regular_price is not None else None,
        "sale_price": str(sale_price) if sale_price is not None else None,
        "manage_stock": True,
        "stock_quantity": stock_qty,
        "stock_status": "instock" if stock_qty > 0 else "outofstock",
        "weight": str(weight) if weight is not None else None,
        "dimensions": {
            "length": str(length) if length is not None else None,
            "width": str(width) if width is not None else None,
            "height": str(height) if height is not None else None,
        },
        "slug": str(slug_val) if slug_val else None,
        "categories": categories,
        "attributes": attributes,
        "meta_data": meta_data,
    }

    # If no mappings configured at all, include minimal payload to allow creation
    if not field_mappings:
        filtered_woo_product = {}
        if sku:
            filtered_woo_product["sku"] = str(sku)
        minimal_name = name or str(product.get('Id', 'Unknown Product'))
        if minimal_name:
            filtered_woo_product["name"] = str(minimal_name)
    else:
        # Only include mapped fields, using normalized mapping labels
        if not allowed_woo_fields:
            filtered_woo_product = {}
        else:
            filtered_woo_product = {k: v for k, v in full_woo_product.items() if k in allowed_woo_fields}
    # Always include SKU if available
    if full_woo_product.get("sku"):
        filtered_woo_product["sku"] = full_woo_product["sku"]

    # Remove null/empty fields recursively where appropriate
    def _clean(obj: Any) -> Any:
        if isinstance(obj, dict):
            cleaned = {k: _clean(v) for k, v in obj.items()}
            return {
                k: v for k, v in cleaned.items()
                if not (
                    v is None
                    or (isinstance(v, str) and v == "")
                    or (isinstance(v, dict) and not v)
                    or (isinstance(v, list) and not v)
                )
            }
        if isinstance(obj, list):
            return [
                _clean(v) for v in obj
                if not (v is None or (isinstance(v, str) and v == "") or (isinstance(v, dict) and not v) or (isinstance(v, list) and not v))
            ]
        return obj

    return _clean(filtered_woo_product)


# ---------------------- Main flow ----------------------

def process_integration(cfg: Dict[str, Any], dry_run: bool, timeout: int) -> Tuple[int, int]:
	if not cfg.get("webshop_url") or not cfg.get("woo_key") or not cfg.get("woo_secret"):
		raise RuntimeError("Missing WooCommerce credentials in integration config")

	products = fetch_katana_products(cfg, timeout)

	woo = woo_session(cfg["woo_key"], cfg["woo_secret"])
	base = cfg["webshop_url"]

	success = 0
	errors = 0
	total_products = len(products)
	
	log.info(f"Starting sync of {total_products} products from Katana to WooCommerce")
	
	for i, prod in enumerate(products, 1):
		try:
			sku = derive_unique_identifier(prod, cfg.get("unique_identifier") or "SKU-1")
			if not sku:
				log.warning(f"Product {i}/{total_products} missing unique identifier; skipping")
				continue

			payload = map_product_to_woo(cfg, prod)
			if dry_run:
				log.info(f"DRY-RUN [{i}/{total_products}] would upsert SKU={sku}: {json.dumps(payload)[:300]}...")
				success += 1
				continue

			existing = find_woo_product_by_sku(woo, base, sku, timeout)
			log.info(f"PAYLOAD {payload}")
			if existing:
				pid = int(existing.get('id'))
				update_woo_product(woo, base, pid, payload, timeout)
				log.info(f"[{i}/{total_products}] Updated Woo product id={pid} SKU={sku}")
			else:
				created = create_woo_product(woo, base, payload, timeout)
				log.info(f"[{i}/{total_products}] Created Woo product id={created.get('id')} SKU={sku}")
			success += 1
		except Exception as e:
			errors += 1
			log.error(f"[{i}/{total_products}] Failed to upsert product SKU={derive_unique_identifier(prod, cfg.get('unique_identifier') or 'SKU-1')}: {e}")
	
	log.info(f"Sync completed for integration {cfg['id']}: {success} successful, {errors} errors out of {total_products} total products")
	return success, errors


def run_sync(integration_id: Optional[int] = None, dry_run: bool = False, verbose: bool = False) -> int:
	"""Run the Katana -> Woo sync without parsing CLI args.

	Intended to be called from code (e.g., Celery tasks).
	"""
	if verbose:
		log.setLevel(logging.DEBUG)

	timeout = int(os.environ.get("REQUEST_TIMEOUT", "120"))

	try:
		with get_db_conn() as conn:
			rows = fetch_integrations(conn, integration_id)
			if not rows:
				log.warning("No active integrations found")
				return 0

			total_ok = 0
			total_err = 0
			total_integrations = len(rows)
			
			log.info(f"Starting sync process for {total_integrations} integration(s)")
			
			for i, row in enumerate(rows, 1):
				log.debug(f"Processing row id={row.get('id')}")
				log.info(f"Processing integration {i}/{total_integrations}: id={row['id']}")
				cfg = extract_integration_config(row)
				log.info(f"Configuration: katana_url={cfg.get('katana_url')} webshop={cfg.get('webshop_url')}")
				try:
					s_ok, s_err = process_integration(cfg, dry_run, timeout)
					total_ok += s_ok
					total_err += s_err
				except Exception as e:
					log.error(f"Integration id={cfg['id']} failed (katana={cfg.get('katana_url')} woo={cfg.get('webshop_url')}): {e}")
					total_err += 1

			log.info(f"All integrations completed! Total products synced: {total_ok} successful, {total_err} errors")
			log.info(f"Summary: {total_ok + total_err} total products processed across {total_integrations} integration(s)")
			
			if total_err == 0:
				log.info("All products successfully synced to WooCommerce!")
			else:
				log.warning(f"⚠️  {total_err} products failed to sync. Check logs for details.")
			
			return 0 if total_err == 0 else 2
	except Exception as e:
		# Print environment context that affects DNS
		db_host = os.environ.get("DB_HOST")
		woo_host = None
		try:
			# derive Woo host if possible
			from urllib.parse import urlparse as _u
			wh = _u(os.environ.get("WOO_BASE_URL", "") or "").hostname
			woo_host = wh
		except Exception:
			pass
		log.error(f"Fatal error: {e} (DB_HOST={db_host} WOO_HOST={woo_host})")
		return 1


def main() -> int:
	parser = argparse.ArgumentParser(description="Sync products from KatanaPIM to WooCommerce using SKU unique id")
	parser.add_argument("--integration-id", type=int, default=None, help="Only process a specific integration id")
	parser.add_argument("--dry-run", action="store_true", help="Do not write to WooCommerce; only log actions")
	parser.add_argument("--verbose", "-v", action="store_true", help="Verbose logging")
	args = parser.parse_args()

	return run_sync(integration_id=args.integration_id, dry_run=args.dry_run, verbose=args.verbose)


if __name__ == "__main__":
	sys.exit(main())