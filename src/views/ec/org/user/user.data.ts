import { unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum, DictEnum, EnumEnum } from '/@/enums/commonEnum';
import { enumComponentProps, dictComponentProps } from '/@/utils/ec/common';
import { tree } from '/@/api/ec/org/org';
import { query } from '/@/api/ec/org/station';
import { check } from '/@/api/ec/org/user';
import { FormSchemaExt, RuleType } from '/@/api/ec/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (enumMap?: object, dictMap?: object): BasicColumn[] => {
  return [
    {
      title: t('ec.org.user.avatar'),
      dataIndex: 'avatar',
      // width: 180,
      slots: { customRender: 'avatar' },
    },
    {
      title: t('ec.org.user.account'),
      dataIndex: 'account',
    },
    {
      title: t('ec.org.user.name'),
      dataIndex: 'name',
    },
    {
      title: t('ec.org.user.orgId'),
      dataIndex: ['echoMap', 'orgId', 'label'],
    },
    {
      title: t('ec.org.user.stationId'),
      dataIndex: ['echoMap', 'stationId'],
    },
    {
      title: t('ec.org.user.email'),
      dataIndex: 'email',
      width: 200,
    },
    {
      title: t('ec.org.user.mobile'),
      dataIndex: 'mobile',
      width: 120,
    },
    {
      title: t('ec.org.user.sex'),
      dataIndex: ['sex', 'desc'],
      width: 70,
      filters: enumMap?.['Sex'],
    },
    {
      title: t('ec.org.user.state'),
      dataIndex: 'state',
      width: 50,
      format: (text) => {
        return text ? t('ec.common.enable') : t('ec.common.disable');
      },
    },
    {
      title: t('ec.org.user.nation'),
      dataIndex: ['echoMap', 'nation'],
      width: 70,
      filters: dictMap?.['NATION'],
    },
    {
      title: t('ec.org.user.education'),
      dataIndex: ['echoMap', 'education'],
      width: 70,
      filters: dictMap?.['EDUCATION'],
    },
    {
      title: t('ec.org.user.positionStatus'),
      dataIndex: ['echoMap', 'positionStatus'],
      width: 100,
      filters: dictMap?.['POSITION_STATUS'],
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
    label: t('ec.org.user.account'),
    field: 'account',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    label: t('ec.org.user.name'),
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
export const editFormSchema = (type): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('ec.org.user.account'),
      field: 'account',
      component: 'Input',
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.EDIT;
      },
    },
    {
      label: t('ec.org.user.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('ec.org.user.orgId'),
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
      label: t('ec.org.user.stationId'),
      field: 'stationId',
      component: 'ApiSelect',
      componentProps: {
        api: query,
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      label: t('ec.org.user.email'),
      field: 'email',
      component: 'Input',
    },
    {
      label: t('ec.org.user.mobile'),
      field: 'mobile',
      component: 'Input',
    },
    {
      label: t('ec.org.user.sex'),
      field: 'sex',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.Sex),
      },
    },
    {
      label: t('ec.org.user.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: t('ec.common.enable'), value: true },
          { label: t('ec.common.disable'), value: false },
        ],
      },
      defaultValue: true,
    },
    // {
    //   label: t('ec.org.user.avatar'),  // 头像一般只有自己会改吧？
    //   field: 'avatar',
    //   component: 'Input',
    // },
    {
      label: t('ec.org.user.nation'),
      field: 'nation',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.NATION),
      },
    },
    {
      label: t('ec.org.user.education'),
      field: 'education',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.EDUCATION),
      },
    },
    {
      label: t('ec.org.user.positionStatus'),
      field: 'positionStatus',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.POSITION_STATUS),
      },
    },
    {
      label: t('ec.org.user.workDescribe'),
      field: 'workDescribe',
      component: 'Input',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (type): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'account',
      type: RuleType.append,
      rules: [
        {
          trigger: 'blur',
          async validator(_, value) {
            if (unref(type) === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (value && (await check(value))) {
              return Promise.reject('账号已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};
