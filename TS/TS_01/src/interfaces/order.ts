// Chi tiết từng sản phẩm trong đơn hàng
export interface OrderItem {
  sku: string;
  productName: string;
  quantity: number;
  price: number;
}

// Thông tin đơn hàng tổng quát
export interface Order {
  orderId: number;
  date: Date;
  items: OrderItem[];
  totalAmount: number;
  calculateTotal(): number;
}
