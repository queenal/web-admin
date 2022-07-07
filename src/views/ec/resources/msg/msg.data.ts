import { h, unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt, RuleType } from '/@/api/ec/common/formValidateService';
import { Tinymce } from '/@/components/Tinymce/index';
import { ActionEnum, EnumEnum, FileBizTypeEnum, FileBucketEnum } from '/@/enums/commonEnum';
import { enumComponentProps } from '/@/utils/ec/common';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('ec.resources.msg.msgType'),
    dataIndex: ['msgType', 'desc'],
    width: 120,
  },
  {
    title: t('ec.resources.msg.title'),
    dataIndex: 'title',
    // width: 180,
  },
  {
    title: t('ec.resources.msg.author'),
    dataIndex: 'author',
    width: 120,
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
    label: t('ec.resources.msg.msgType'),
    field: 'msgType',
    component: 'ApiSelect',
    componentProps: {
      ...enumComponentProps(EnumEnum.MsgType),
    },
    colProps: { span: 5 },
  },
  {
    label: t('ec.resources.msg.title'),
    field: 'title',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    label: t('ec.resources.msg.author'),
    field: 'author',
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
export const editFormSchema = (type, msgTypeChange: Fn): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('ec.resources.msg.title'),
      field: 'title',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.VIEW;
      },
    },
    {
      label: t('ec.resources.msg.author'),
      field: 'author',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.VIEW;
      },
    },
    {
      label: t('ec.resources.msg.msgType'),
      field: 'msgType',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.MsgType),
        onChange: msgTypeChange,
      },
      colProps: {
        span: 12,
      },
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.VIEW;
      },
    },
    {
      label: '接收类型',
      field: 'receiveType',
      component: 'Input',
      colProps: {
        span: 12,
      },
      slot: 'receiveType',
    },
    {
      label: t('ec.resources.msg.content'),
      field: 'content',
      component: 'Input',
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
          uploadParams: {
            bizType: FileBizTypeEnum.EXTEND_MSG_CONTENT,
            bucket: FileBucketEnum.public,
          },
        });
      },
    },
    {
      label: t('ec.resources.msg.isSingleHandle'),
      field: 'isSingleHandle',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: t('ec.common.yes'), value: true },
          { label: t('ec.common.no'), value: false },
        ],
      },
      defaultValue: true,
      ifShow: false,
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'title',
      type: RuleType.append,
      rules: [{ trigger: 'blur', required: true }],
    },
    {
      field: 'msgType',
      type: RuleType.append,
      rules: [{ trigger: 'blur', required: true }],
    },
  ];
};
