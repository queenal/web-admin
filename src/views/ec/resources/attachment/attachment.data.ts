import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { uploadApi } from '/@/api/ec/file/upload';

import { enumComponentProps, formatFileSize } from '/@/utils/ec/common';
import { EnumEnum } from '/@/enums/commonEnum';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: '文件预览',
      dataIndex: 'path',
      // width: 120,
      slots: { customRender: 'path' },
    },
    {
      title: t('ec.resources.attachment.originalFileName'),
      dataIndex: 'originalFileName',
      // width: 180,
    },
    {
      title: t('ec.resources.attachment.bucket'),
      dataIndex: 'bucket',
      width: 100,
    },
    {
      title: t('ec.resources.attachment.bizType'),
      dataIndex: 'bizType',
    },
    {
      title: t('ec.resources.attachment.storageType'),
      dataIndex: ['storageType', 'desc'],
      width: 100,
    },
    {
      title: t('ec.resources.attachment.fileType'),
      dataIndex: ['fileType', 'desc'],
      width: 100,
    },
    {
      title: t('ec.resources.attachment.contentType'),
      dataIndex: 'contentType',
      // width: 180,
    },
    {
      title: t('ec.resources.attachment.size'),
      dataIndex: 'size',
      width: 100,
      format: (text) => {
        return formatFileSize(text);
      },
    },
    {
      title: t('ec.common.createTime'),
      dataIndex: 'createTime',
      sorter: true,
      width: 180,
    },
  ];
};

export const searchFormSchema: FormSchema[] = [
  {
    label: t('ec.resources.attachment.originalFileName'),
    field: 'originalFileName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: t('ec.resources.attachment.bucket'),
    field: 'bucket',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: t('ec.resources.attachment.storageType'),
    field: 'storageType',
    component: 'ApiSelect',
    componentProps: {
      ...enumComponentProps(EnumEnum.FileStorageType),
    },
    colProps: { span: 6 },
  },
  {
    label: t('ec.resources.attachment.fileType'),
    field: 'fileType',
    component: 'ApiSelect',
    componentProps: {
      ...enumComponentProps(EnumEnum.FileType),
    },
    colProps: { span: 6 },
  },
  {
    label: t('ec.resources.attachment.contentType'),
    field: 'contentType',
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
export const editFormSchema = (param): FormSchema[] => {
  return [
    {
      label: t('ec.resources.attachment.storageType'),
      field: 'storageType',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.FileStorageType),
        onChange: (value: string) => {
          param.storageType = value;
        },
      },
      defaultValue: param.storageType,
    },
    {
      label: t('ec.resources.attachment.bucket'),
      field: 'bucket',
      component: 'Select',
      componentProps: {
        onChange: (value: string) => {
          param.bucket = value;
        },
        options: [
          {
            label: '私有资源',
            value: 'dev',
            key: 'dev',
          },
          {
            label: '公共资源',
            value: 'public',
            key: 'public',
          },
        ],
      },
      defaultValue: param.bucket,
    },
    {
      label: t('ec.resources.attachment.bizType'),
      field: 'bizType',
      component: 'Input',
      defaultValue: param.bizType,
      componentProps: {
        onChange: (e: InputEvent) => {
          param.bizType = (e?.target as HTMLInputElement)?.value;
        },
      },
      required: true,
    },
    {
      label: '文件',
      field: 'file',
      component: 'Upload',
      helpMessage:
        '上面的3个参数可以实时控制本组件传递到后台的对应的参数，此功能一般只开放给开发人员调试使用。',
      componentProps: {
        api: uploadApi,
        uploadParams: param,
        multiple: false,
        maxNumber: 1,
      },
    },
  ];
};
