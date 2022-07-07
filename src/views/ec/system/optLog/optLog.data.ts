import { dateUtil } from '/@/utils/dateUtil';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/ec/common/formValidateService';
import { enumComponentProps } from '/@/utils/ec/common';
import { EnumEnum } from '/@/enums/commonEnum';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('ec.system.optLog.requestIp'),
    dataIndex: 'requestIp',
    width: 170,
  },
  {
    title: t('ec.system.optLog.type'),
    dataIndex: ['type', 'desc'],
    width: 100,
  },
  {
    title: t('ec.system.optLog.userName'),
    dataIndex: 'userName',
    width: 180,
  },
  {
    title: t('ec.system.optLog.description'),
    dataIndex: 'description',
    // width: 180,
  },
  {
    title: t('ec.system.optLog.classPath'),
    dataIndex: 'classPath',
    // width: 180,
  },
  {
    title: t('ec.system.optLog.actionMethod'),
    dataIndex: 'actionMethod',
    // width: 180,
  },
  {
    title: t('ec.system.optLog.requestUri'),
    dataIndex: 'requestUri',
    // width: 180,
  },
  {
    title: t('ec.system.optLog.httpMethod'),
    dataIndex: ['httpMethod', 'desc'],
    // width: 180,
  },
  {
    title: t('ec.system.optLog.startTime'),
    dataIndex: 'startTime',
    width: 180,
  },
  {
    title: t('ec.system.optLog.finishTime'),
    dataIndex: 'finishTime',
    width: 180,
  },
  {
    title: t('ec.system.optLog.consumingTime'),
    dataIndex: 'consumingTime',
    width: 100,
    format: (text: string) => {
      return text + 'ms';
    },
  },
  {
    title: t('ec.system.optLog.ua'),
    dataIndex: 'ua',
    // width: 180,
  },
  {
    title: t('ec.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: t('ec.system.optLog.userName'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'classPath',
    label: t('ec.system.optLog.classPath'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'requestUri',
    label: t('ec.system.optLog.requestUri'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'requestIp',
    label: t('ec.system.optLog.requestIp'),
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'createTimeRange',
    label: t('ec.common.createTime'),
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];

// 编辑页字段
export const editFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: t('ec.system.optLog.requestIp'),
    field: 'requestIp',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.type'),
    field: 'type',
    component: 'ApiSelect',
    componentProps: {
      ...enumComponentProps(EnumEnum.LogType),
    },
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.userName'),
    field: 'userName',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.description'),
    field: 'description',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.classPath'),
    field: 'classPath',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.actionMethod'),
    field: 'actionMethod',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.requestUri'),
    field: 'requestUri',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.httpMethod'),
    field: 'httpMethod',
    component: 'ApiSelect',
    componentProps: {
      ...enumComponentProps(EnumEnum.HttpMethod),
    },
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.startTime'),
    field: 'startTime',
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
    },
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.finishTime'),
    field: 'finishTime',
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
    },
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.consumingTime'),
    field: 'consumingTime',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.ua'),
    field: 'ua',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.optLog.ua'),
    field: 'ua',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '请求参数',
    field: 'params',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '返回值',
    field: 'result',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '异常描述',
    field: 'exDetail',
    component: 'Input',
    dynamicDisabled: true,
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
