export interface User {
  email: string;
  password: string;
}

export interface Category {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;
}

export interface Message {
  message: string;
}

export interface Position {
  name: string;
  cost: number;
  category: string;
  user?: string;
  _id?: string;
  quantity?: number;
}

export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  list: OrderPosition[];
  _id?: string;
}

export interface OrderPosition {
  name: string;
  quantity: number;
  cost: number;
  _id?: string;
}

export interface Filter {
  start?: Date;
  end?: Date;
  order?: number;
}

export interface OverviewPage {
  orders: OverviewPageItem;
  gain: OverviewPageItem;
}

export interface OverviewPageItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: number;
}

export interface AnalyticsPage {
  average: number;
  chart: AnalyticsChartItem;
}

export interface AnalyticsChartItem {
  gain: number;
  order: number;
  label: string;
  map: any;
}
