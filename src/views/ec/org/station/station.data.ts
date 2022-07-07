import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/ec/common/formValidateService';
import { tree } from '/@/api/ec/org/org';
const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('ec.org.station.name'),
    dataIndex: 'name',
    // width: 180,
  },
  {
    title: t('ec.org.station.orgId'),
    dataIndex: ['echoMap', 'orgId', 'label'],
    width: 180,
  },
  {
    title: t('ec.org.station.state'),
    dataIndex: 'state',
    width: 50,
    format: (text: string) => {
      return text ? '启用' : '禁用';
    },
  },
  {
    title: t('ec.org.station.describe'),
    dataIndex: 'describe',
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
    label: t('ec.org.station.name'),
    field: 'name',
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
    label: t('ec.org.station.name'),
    field: 'name',
    component: 'Input',
  },
  {
    label: t('ec.org.station.orgId'),
    field: 'orgId',
    component: 'ApiTreeSelect',
    componentProps: {
      api: tree,
      labelField: 'label',
      valueField: 'id',
      allowClear: true,
    },
  },
  {
    label: t('ec.org.station.state'),
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
    label: t('ec.org.station.describe'),
    field: 'describe',
    component: 'Input',
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
