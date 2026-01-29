import { WooProduct } from "@/src/lib/types";

const WC_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

export async function getProducts(params?: {
  per_page?: number;
  featured?: boolean;
  on_sale?: boolean;
}) {
  try {
    // 1. Check Credentials
    if (!WC_BASE_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      console.error("❌ ERROR: .env.local variables missing!");
      return [];
    }

    const credentials = btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`);
    const searchParams = new URLSearchParams();

    if (params?.per_page)
      searchParams.set("per_page", params.per_page.toString());
    if (params?.featured) searchParams.set("featured", "true");
    if (params?.on_sale) searchParams.set("on_sale", "true");

    const url = `${WC_BASE_URL}/wp-json/wc/v3/products?${searchParams.toString()}`;

    console.log(`📡 Fetching: ${url}`); // Terminal main URL print karega

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      next: { revalidate: 10 }, // Cache disable for debugging
    });

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error("Error Details:", text); // HTML error page dikhayega agar hua toh
      return [];
    }

    const data = await response.json();
    console.log(`✅ Success! Found ${data.length} products.`); // Batayega kitne products mile

    return data;
  } catch (error) {
    console.error("❌ Fetch Exception:", error);
    return [];
  }
}
