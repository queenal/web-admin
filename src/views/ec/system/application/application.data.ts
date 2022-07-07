import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

import { FormSchemaExt } from '/@/api/ec/common/formValidateService';
import { enumComponentProps } from '/@/utils/ec/common';
import { EnumEnum } from '/@/enums/commonEnum';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('ec.system.application.clientId'),
    dataIndex: 'clientId',
    // width: 180,
  },
  {
    title: t('ec.system.application.name'),
    dataIndex: 'name',
    // width: 180,
  },
  {
    title: t('ec.system.application.website'),
    dataIndex: 'website',
    // width: 180,
  },
  {
    title: t('ec.system.application.appType'),
    dataIndex: ['appType', 'desc'],
    width: 120,
  },
  {
    title: t('ec.system.application.describe'),
    dataIndex: 'describe',
    // width: 180,
  },
  {
    title: t('ec.system.application.state'),
    dataIndex: 'state',
    width: 80,
    format: (text) => {
      return text ? t('ec.common.enable') : t('ec.common.disable');
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
    label: t('ec.system.application.name'),
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
export const editFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('ec.system.application.clientId'),
      field: 'clientId',
      component: 'Input',
      dynamicDisabled: ({ values }) => {
        return !!values?.id;
      },
      show: ({ values }) => {
        return values?.id;
      },
    },
    {
      label: t('ec.system.application.clientSecret'),
      field: 'clientSecret',
      component: 'Input',
      dynamicDisabled: ({ values }) => {
        return !!values?.id;
      },
      show: ({ values }) => {
        return values?.id;
      },
    },
    {
      label: t('ec.system.application.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('ec.system.application.appType'),
      field: 'appType',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.ApplicationAppTypeEnum),
      },
    },
    {
      label: t('ec.system.application.website'),
      field: 'website',
      component: 'Input',
    },
    {
      label: t('ec.system.application.describe'),
      field: 'describe',
      component: 'Input',
    },
    {
      label: t('ec.system.application.state'),
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
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
