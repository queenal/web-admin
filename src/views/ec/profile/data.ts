import { FormSchema } from '/@/components/Form/index';
import { enumComponentProps, dictComponentProps } from '/@/utils/ec/common';
import { DictEnum, EnumEnum } from '/@/enums/commonEnum';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
  {
    key: '3',
    name: '登录日志',
    component: 'LoginLog',
  },
  {
    key: '4',
    name: '账号绑定(需要开发)',
    component: 'AccountBind',
  },
  {
    key: '5',
    name: '新消息通知(需要开发)',
    component: 'MsgNotify',
  },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: 'ID',
    colProps: { span: 18 },
    show: false,
  },
  {
    field: 'account',
    component: 'Input',
    label: '账号',
    colProps: { span: 18 },
    dynamicDisabled: () => {
      return true;
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '昵称',
    colProps: { span: 18 },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: { span: 18 },
  },
  {
    field: 'sex',
    component: 'ApiSelect',
    label: '性别',
    colProps: { span: 18 },
    componentProps: {
      ...enumComponentProps(EnumEnum.Sex),
    },
  },
  {
    field: 'nation',
    component: 'ApiSelect',
    label: '民族',
    colProps: { span: 18 },
    componentProps: {
      ...dictComponentProps(DictEnum.NATION),
    },
  },
  {
    field: 'education',
    component: 'ApiSelect',
    label: '学历',
    colProps: { span: 18 },
    componentProps: {
      ...dictComponentProps(DictEnum.EDUCATION),
    },
  },
  {
    field: 'positionStatus',
    component: 'ApiSelect',
    label: '职位状态',
    colProps: { span: 18 },
    componentProps: {
      ...dictComponentProps(DictEnum.POSITION_STATUS),
    },
  },
  {
    field: 'workDescribe',
    component: 'InputTextArea',
    label: '个人简介',
    colProps: { span: 18 },
  },
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '当前密码强度：：强',
    extra: '修改',
  },
  {
    key: '2',
    title: '密保手机',
    description: '已绑定手机：：138****8293',
    extra: '修改',
  },
  {
    key: '3',
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    extra: '修改',
  },
  {
    key: '4',
    title: '备用邮箱',
    description: '已绑定邮箱：：ant***sign.com',
    extra: '修改',
  },
  {
    key: '5',
    title: 'MFA 设备',
    description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    extra: '修改',
  },
];

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    extra: '绑定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    extra: '绑定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    extra: '绑定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
];
