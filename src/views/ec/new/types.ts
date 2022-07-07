export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  date: string;
}

export interface TaskItem {
  percent: number;
  status: 'success' | 'exception' | 'active';
  updateTime: string;
  title: string;
  desc: string;
}

export interface TenVisit {
  login_date: string;
  count: number;
}

export interface TableItem {
  time: string;
  name: string;
  number: string;
  state: string;
}
