import { GrowCardItem, TableItem } from './types';
export const growCardList: GrowCardItem[] = [
  {
    title: '当日办件',
    icon: 'user|svg',
    value: 99,
    date: '2022-01-26',
  },
  {
    title: '当月办件',
    icon: 'user|svg',
    value: 921,
    date: '2022-01-26',
  },
  {
    title: '当年办件',
    icon: 'user|svg',
    value: 3694,
    date: '2022-01-26',
  },
];

export const tableData: TableItem[] = [
  {
    time: '2016-05-02 14:45:12',
    name: '杭州运输有限公司运输有限公司',
    number: '浙A2F018、浙A2F018挂',
    state: '待受理',
  },
  {
    time: '2016-05-02 14:45:12',
    name: '杨阳洋',
    number: '浙A2F018、浙A2F018挂',
    state: '初审',
  },
  {
    time: '2016-05-02 14:45:12',
    name: '杭州运输有限公司运输有限公司',
    number: '浙A2F018、浙A2F018挂',
    state: '待受理',
  },
  {
    time: '2016-05-02 14:45:12',
    name: '杭州公共运输有限公司',
    number: '浙A2F018、浙A2F018挂',
    state: '初审',
  },
];
export const columns = [
  {
    title: '车牌号',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '申请人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '申请时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
  },
];
export const useOperation = [
  {
    // img:require("@/assets/image/home/icon_transfinite.png"),
    icon: 'dynamic-avatar-1|svg',
    text: '超限许可办件',
  },
  {
    // img:require("@/assets/image/home/icon_white_manage.png"),
    icon: 'dynamic-avatar-2|svg',
    text: '白名单管理',
  },
  {
    // img:require("@/assets/image/home/icon_license_manage.png"),
    icon: 'dynamic-avatar-3|svg',
    text: '许可证管理',
  },
  {
    // img:require("@/assets/image/home/icon_statistical_analysis.png"),
    icon: 'dynamic-avatar-4|svg',
    text: '统计分析',
  },
  {
    // img:require("@/assets/image/home/icon_object_manage.png"),
    icon: 'dynamic-avatar-5|svg',
    text: '对象管理',
  },
  {
    // img:require("@/assets/image/home/icon_add.png"),
    icon: 'dynamic-avatar-6|svg',
    text: '黑名单管理',
  },
];
