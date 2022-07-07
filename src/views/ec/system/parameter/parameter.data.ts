import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/ec/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('ec.system.parameter.key'),
    dataIndex: 'key',
    // width: 180,
  },
  {
    title: t('ec.system.parameter.value'),
    dataIndex: 'value',
    // width: 180,
  },
  {
    title: t('ec.system.parameter.name'),
    dataIndex: 'name',
    // width: 180,
  },
  {
    title: t('ec.system.parameter.describe'),
    dataIndex: 'describe',
    // width: 180,
  },
  {
    title: t('ec.system.parameter.state'),
    dataIndex: 'state',
    width: 80,
    format: (text: string) => {
      return text ? t('ec.common.enable') : t('ec.common.disable');
    },
  },
  {
    title: t('ec.system.parameter.readonly'),
    dataIndex: 'readonly',
    width: 80,
    format: (text: string) => {
      return text ? t('ec.common.yes') : t('ec.common.no');
    },
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
    label: t('ec.system.parameter.key'),
    field: 'key',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: t('ec.system.parameter.value'),
    field: 'value',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: t('ec.system.parameter.name'),
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: t('ec.system.parameter.describe'),
    field: 'describe',
    component: 'Input',
    colProps: { span: 6 },
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
    label: t('ec.system.parameter.key'),
    field: 'key',
    component: 'Input',
  },
  {
    label: t('ec.system.parameter.value'),
    field: 'value',
    component: 'Input',
  },
  {
    label: t('ec.system.parameter.name'),
    field: 'name',
    component: 'Input',
  },
  {
    label: t('ec.system.parameter.describe'),
    field: 'describe',
    component: 'Input',
  },
  {
    label: t('ec.system.parameter.state'),
    field: 'state',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: t('ec.common.yes'), value: true },
        { label: t('ec.common.no'), value: false },
      ],
    },
    defaultValue: true,
  },
  {
    label: t('ec.system.parameter.readonly'),
    field: 'readonly',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: t('ec.common.yes'), value: true },
        { label: t('ec.common.no'), value: false },
      ],
    },
    defaultValue: false,
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
