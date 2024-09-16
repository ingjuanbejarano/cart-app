export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsResponse {
  count: number;
  resources: Product[];
  total: number;
}
