export interface WooProduct {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  images: { src: string; alt: string }[];
  short_description: string;
  description: string;
}
