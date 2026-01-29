import DashboardLayout from "@/layouts/DashboardLayout";
import { useState } from "react";
import ApiKeysForm from "./ApiKeysForm";
import CreateIntegration from "./CreateIntegration";
import IntegrationDetailsForm from "./IntegrationDetailsForm";
import LetsGo from "./LetsGO";
import MappingForm from "./MappingForm";
import SelectStore from "./SelectStore";
import SpecificationForm from "./SpecificationForm";
import { useIntegrationWizard } from "@/context/IntegrationWizardContext";
import { buildUrl } from "../../config";

type IntegrationDetailsPayload = {
    name: string;
    description?: string;
};

type ApiKeysPayload = {
    katanaPimUrl: string;
    katanaPimApiKey: string;
    webshopUrl: string;
    wooCommerceApiKey: string;
    wooCommerceApiSecret: string;
};

export type StoreItem = {
    Id: number;
    SystemName: string;
    Name: string;
};

export type MappingPayload = {
    identifier: string;
    identificationType: string;
    fields_mapping_data: any[];
};

export type SpecificationPayload = {
    specifications: string[]; // Add specifications
    seo_data: {
        metaTitle: string;
        metaDescription: string;
        slug: string;
    }; // Add SEO data
};


export default function IntegrationPage() {
    const [step, setStep] = useState<
        | "createintegration"
        | "integrationdetails"
        | "apiKeys"
        | "selectstore"
        | "mapping"
        | "specification"
        | "seo"
    >("createintegration");

    const { details, apiKeys, store, mapping, setDetails, setApiKeys, setStore, setMapping, resetAll } = useIntegrationWizard();

    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [verifying, setVerifying] = useState(false);
    const [verifiedMessage, setVerifiedMessage] = useState<string | null>(null);
    const [preloadedStores, setPreloadedStores] = useState<StoreItem[]>([]);

    // Step jump helpers
    const createintegrationstep = () => setStep("createintegration");
    const createintegrationdetailsformstep = () => setStep("integrationdetails");
    const apikeyformstep = () => setStep("apiKeys");
    const selectstorestep = () => setStep("selectstore");
    const mappingformstep = () => setStep("mapping");
    const specificationformstep = () => setStep("specification");

    // 1) Integration details -> save locally, go to API keys
    const handleIntegrationDetailsNext = (data: IntegrationDetailsPayload) => {
        setDetails(data);
        setStep("apiKeys");
    };

    // 2) API keys -> save locally, go to Select Store (no POST yet)
    const handleApiKeysNext = async (data: ApiKeysPayload) => {
        setApiKeys(data);
        setVerifiedMessage(null);
        setVerifying(true);
        setSaveError(null);

        try {
            // Compose Katana endpoint like SelectStore does
            const normalizedBase = (data.katanaPimUrl || "").replace(/\/+$/, "");
            if (!normalizedBase) throw new Error("KatanaPIM URL is required.");

            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken) throw new Error("Missing access token.");

            const payload = {
                katana_url: `${normalizedBase}/api/v1/Store/GetAll`,
                api_key: data.katanaPimApiKey,
            };

            const res = await fetch(buildUrl("/api/store-list/"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(text || `Credentials verification failed (${res.status}).`);
            }

            const stores: StoreItem[] = await res.json();
            if (!Array.isArray(stores) || stores.length === 0) {
                throw new Error("No stores returned. Please check your credentials.");
            }

            // ✅ Success: show message on API Keys step, then move with stores loaded
            setPreloadedStores(stores);
            setVerifiedMessage("Credentials Verified!");
            setStep("selectstore");
        } catch (e: any) {
            setSaveError(e?.message || "Failed to verify credentials.");
            // ❌ Do NOT move to store step
        } finally {
            setVerifying(false);
        }
    };


    // 3) Select Store -> save locally, go to Mapping (no POST yet)
    const handleStoreNext = async (store: StoreItem) => {
        if (!details || !apiKeys) {
            setSaveError("Missing details or API keys.");
            return;
        }
        setStore(store);
        setStep("mapping");
    };

    // 3) Mapping -> save locally, go to Specification (no POST yet)
    const handleMappingNext = async (mapping: MappingPayload) => {
        if (!details || !apiKeys) {
            setSaveError("Missing details or API keys.");
            return;
        }
        setMapping(mapping);
        setStep("specification");
    };

    // 3) Specification -> POST with { data, api_data, store_data, mapping_data, specification_data }
    const handleSpecificationNext = async (specification: SpecificationPayload) => {
        if (!details || !apiKeys || !mapping) {
            setSaveError("Missing details or API keys or mapping.");
            return;
        }

        // Retrieve the access token from sessionStorage
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
            setSaveError("Missing access token.");
            return;
        }

        const payload = {
            step: 6,
            user_id: 1,
            data: {
                name: details.name ?? "",
                description: details.description ?? "",
            },
            api_data: {
                katanaPimUrl: apiKeys.katanaPimUrl,
                katanaPimApiKey: apiKeys.katanaPimApiKey,
                webshopUrl: apiKeys.webshopUrl,
                wooCommerceApiKey: apiKeys.wooCommerceApiKey,
                wooCommerceApiSecret: apiKeys.wooCommerceApiSecret,
            },
            store_data: store, // Store data
            unique_identifier: {
                identifier: mapping.identifier,
                identificationType: mapping.identificationType,
            },
            fields_mapping_data: mapping.fields_mapping_data,
            specifications: specification.specifications, // Now we have specifications
            seo_data: specification.seo_data, // Now we have seo_data
            status:"active"
        };

        try {
            setSaving(true);
            setSaveError(null);

            const res = await fetch(buildUrl("/api/integrations/"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`, // Add the bearer token here
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `Request failed with ${res.status}`);
            }
            resetAll();
            setStep("seo"); // continue your wizard
        } catch (err: any) {
            setSaveError(err?.message || "Failed to save integration.");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardLayout>
            {step === "createintegration" ? (
                <CreateIntegration onNextStep={createintegrationdetailsformstep} />
            ) : step === "integrationdetails" ? (
                <IntegrationDetailsForm
                    defaultValues={details ?? undefined}
                    onNextStep={handleIntegrationDetailsNext}
                    onPreviousStep={createintegrationstep}
                />
            ) : step === "apiKeys" ? (
                <ApiKeysForm
                    defaultValues={apiKeys ?? undefined}
                    onNextStep={handleApiKeysNext}
                    onPreviousStep={createintegrationdetailsformstep}
                    verifying={verifying}
                    verifiedMessage={verifiedMessage}
                    errorMessage={saveError ?? undefined}
                />
            ) : step === "selectstore" ? (
                <SelectStore
                    defaultValues={store ? { storeId: String(store.Id) } : undefined}
                    onNextStep={handleStoreNext}
                    onPreviousStep={apikeyformstep}
                    preloadedStores={preloadedStores}   // ✅ pass preloaded stores
                />
            ) : step === "mapping" ? (
                <MappingForm defaultValues={mapping ?? undefined} onNextStep={handleMappingNext} onPreviousStep={selectstorestep} />
            ) : step === "specification" ? (
                <SpecificationForm baseUrl={apiKeys?.katanaPimUrl || ""}
                    apiKey={apiKeys?.katanaPimApiKey || ""} onNextStep={handleSpecificationNext} onPreviousStep={mappingformstep} />
            ) : step === "seo" ? (
                <LetsGo onNextStep={createintegrationstep} onPreviousStep={specificationformstep} />
            ) : (
                <div />
            )}

            {saving && <div className="mt-4 text-sm text-muted-foreground">Saving integration…</div>}
            {saveError && <div className="mt-2 text-sm text-destructive">{saveError}</div>}
        </DashboardLayout>
    );
}
