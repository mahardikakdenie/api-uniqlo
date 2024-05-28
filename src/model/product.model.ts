export interface I_PRODUCT {
  name: string;
  description: string;
  price: string;
  ownerId: number;
}

export interface T_PRODUCT_RESPONSE extends I_PRODUCT {
  id: number;
}

export interface I_PRODUCT_REQUEST {
  name: string;
  description: string;
  price: string;
  owner_id?: number;
  id?: number;
}
