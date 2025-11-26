export type OrderStatus = "processing" | "shipped" | "delivered";

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  status: OrderStatus;
  total: number;
  items: number;
  date: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface TimelineStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning";
  message: string;
  timestamp: string;
}

export interface Feature {
  title: string;
  subtitle: string;
  description: string;
  icon?: string;
}
