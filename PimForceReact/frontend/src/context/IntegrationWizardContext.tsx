import React, { createContext, useContext, useMemo, useState } from "react";

export type IntegrationDetailsPayload = {
  name: string;
  description?: string;
};

export type ApiKeysPayload = {
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
  specifications: string[];
  seo_data: {
    metaTitle: string;
    metaDescription: string;
    slug: string;
  };
};

type WizardState = {
  details: IntegrationDetailsPayload | null;
  apiKeys: ApiKeysPayload | null;
  store: StoreItem | null;
  mapping: MappingPayload | null;
};

type WizardActions = {
  setDetails: (v: IntegrationDetailsPayload) => void;
  setApiKeys: (v: ApiKeysPayload) => void;
  setStore: (v: StoreItem) => void;
  setMapping: (v: MappingPayload) => void;
  resetAll: () => void;
};

const IntegrationWizardContext = createContext<(WizardState & WizardActions) | null>(null);

export function IntegrationWizardProvider({ children }: { children: React.ReactNode }) {
  const [details, setDetails] = useState<WizardState["details"]>(null);
  const [apiKeys, setApiKeys] = useState<WizardState["apiKeys"]>(null);
  const [store, setStore] = useState<WizardState["store"]>(null);
  const [mapping, setMapping] = useState<WizardState["mapping"]>(null);

  const resetAll = () => {
    setDetails(null);
    setApiKeys(null);
    setStore(null);
    setMapping(null);
  };

  const value = useMemo(
    () => ({ details, apiKeys, store, mapping, setDetails, setApiKeys, setStore, setMapping, resetAll }),
    [details, apiKeys, store, mapping]
  );

  return (
    <IntegrationWizardContext.Provider value={value}>
      {children}
    </IntegrationWizardContext.Provider>
  );
}

export function useIntegrationWizard() {
  const ctx = useContext(IntegrationWizardContext);
  if (!ctx) throw new Error("useIntegrationWizard must be used within IntegrationWizardProvider");
  return ctx;
}
