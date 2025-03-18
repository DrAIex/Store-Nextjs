export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  brand: string;
  isNew: boolean;
  image: string;
  url: string;
}

export interface CartItem extends Product {
  quantity: number;
} 