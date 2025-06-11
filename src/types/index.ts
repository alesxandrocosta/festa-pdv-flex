
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export type UserRole = 
  | 'admin_sistema' 
  | 'admin_empresa' 
  | 'gerente' 
  | 'supervisor' 
  | 'caixa' 
  | 'atendente';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  cost_price: number;
  barcode?: string;
  category_id: string;
  stock_quantity: number;
  min_stock: number;
  active: boolean;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  company_id: string;
  created_at: string;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  current_order_id?: string;
  company_id: string;
  created_at: string;
}

export interface Order {
  id: string;
  table_id?: string;
  customer_name?: string;
  status: 'open' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total: number;
  payment_method?: string;
  user_id: string;
  company_id: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product: Product;
}

export interface RentalItem {
  id: string;
  name: string;
  description?: string;
  daily_price: number;
  category: string;
  available_quantity: number;
  total_quantity: number;
  company_id: string;
  image_url?: string;
  created_at: string;
}

export interface Rental {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  event_date: string;
  pickup_date: string;
  return_date: string;
  status: 'reserved' | 'picked_up' | 'returned' | 'cancelled';
  total: number;
  payment_status: 'pending' | 'partial' | 'paid';
  user_id: string;
  company_id: string;
  items: RentalItemOrder[];
  created_at: string;
  updated_at: string;
}

export interface RentalItemOrder {
  id: string;
  rental_id: string;
  rental_item_id: string;
  quantity: number;
  daily_price: number;
  days: number;
  subtotal: number;
  rental_item: RentalItem;
}

export interface Company {
  id: string;
  name: string;
  cnpj?: string;
  address?: string;
  phone?: string;
  email?: string;
  created_at: string;
}

export interface Sale {
  id: string;
  total: number;
  payment_method: string;
  user_id: string;
  company_id: string;
  items: SaleItem[];
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product: Product;
}
