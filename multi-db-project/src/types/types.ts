export type InvoiceReportItem = {
  headerData: {
    invoice_no: string;
    customer_no: string;
    customer_name: string;
    posting_date: Date;
    document_date: Date;
    fbrinvoiceno: string | null;
  };
  items: any;
  headerTotalData: {
    totalcost: number;
    totalcostincludingdiscount: number;
    totaltax: number;
    totalcostincludingtax: number;
    advancedtax: number;
    totaladvancedtax: number;
    totalcostincludingadvancedtax: number;
    total_quantity: number;
  };
};

export type SalesReport = {
  invoices: InvoiceReportItem[];
  totalData: InvoiceReportItem['headerTotalData'];
};

export type PurchaseInvoiceReportItem = {
  headerData: {
    invoice_no: string;
    vendor_name: string;
    posting_date: Date;
    document_date: Date;
  };
  items: any;
  headerTotalData: {
    totalcost: number;
    totaltax: number;
    totalcostincludingtax: number;
    advancedtax: number;
    totaladvancedtax: number;
    totalcostincludingadvancedtax: number;
    total_quantity: number;
  };
};

export type PurchaseInvoiceReport = {
  invoices: PurchaseInvoiceReportItem[];
  totalData: PurchaseInvoiceReportItem['headerTotalData'];
};

export type SalesReturnInvoiceReportItem = {
  headerData: {
    invoice_no: string;
    sales_invoice_no: string;
    customer_name: string;
    posting_date: Date;
    document_date: Date;
    fbrinvoiceno: string | null;
  };
  items: any;
  headerTotalData: {
    totalcost: number;
    totalcostincludingdiscount: number;
    totaltax: number;
    totalcostincludingtax: number;
    advancedtax: number;
    totaladvancedtax: number;
    totalcostincludingadvancedtax: number;
    total_quantity: number;
  };
};

export type SalesReturnInvoiceReport = {
  invoices: SalesReturnInvoiceReportItem[];
  totalData: SalesReturnInvoiceReportItem['headerTotalData'];
};

export type PurchaseReturnInvoiceReportItem = {
  headerData: {
    invoice_no: string;
    purchase_invoice_no: string;
    vendor_name: string;
    posting_date: Date;
    document_date: Date;
  };
  items: any;
  headerTotalData: {
    totalcost: number;
    totaltax: number;
    totalcostincludingtax: number;
    advancedtax: number;
    totaladvancedtax: number;
    totalcostincludingadvancedtax: number;
    total_quantity: number;
  };
};

export type PurchaseReturnInvoiceReport = {
  invoices: PurchaseReturnInvoiceReportItem[];
  totalData: PurchaseReturnInvoiceReportItem['headerTotalData'];
};

export interface UnifiedInvoiceReport {
  invoices: any[]; // or your specific structure
  totalData: {
    totalcost: number;
    totalcostincludingdiscount: number;
    totaltax: number;
    totalcostincludingtax: number;
    furthertax: number;
    totalfurthertax: number;
    totalcostincludingfurthertax: number;
    advancedtax: number;
    totaladvancedtax: number;
    totalcostincludingadvancedtax: number;
    total_quantity: number;
  };
}

export type InvoiceReportFilters = {
  document_type?: 'SalesInvoice' | 'SalesReturn';
  document_date_from: string;
  document_date_to: string;
  customer_id?: string;
};

export interface PurchaseInvoiceReportFilters {
  document_type?: 'PurchaseInvoice' | 'PurchaseReturn';
  document_date_from: string;
  document_date_to: string;
  vendor_id?: string | null;
}

export interface UnifiedPurchaseInvoiceReport {
  invoices: any[]; // you can replace `any` with a common structure if needed
  totalData: {
    totalcost: number;
    totaltax: number;
    totalcostincludingtax: number;
    advancedtax: number;
    totaladvancedtax: number;
    totalcostincludingadvancedtax: number;
    total_quantity: number;
  };
}
