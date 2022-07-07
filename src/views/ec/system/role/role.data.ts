import { Ref, unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum, DictEnum } from '/@/enums/commonEnum';
import { FormSchemaExt, RuleType } from '/@/api/ec/common/formValidateService';
import { check } from '/@/api/ec/system/role';
import { tree } from '/@/api/ec/org/org';
import { dictComponentProps } from '/@/utils/ec/common';
import { RoleCategoryEnum } from '/@/enums/biz/authority';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('ec.system.role.code'),
      dataIndex: 'code',
      width: 180,
    },
    {
      title: t('ec.system.role.category'),
      dataIndex: ['echoMap', 'category'],
      width: 180,
    },
    {
      title: t('ec.system.role.name'),
      dataIndex: 'name',
      width: 180,
    },
    {
      title: t('ec.system.role.describe'),
      dataIndex: 'describe',
      // width: 180,
    },
    {
      title: t('ec.system.role.state'),
      dataIndex: 'state',
      width: 80,
      format: (text: string) => {
        return text ? t('ec.common.enable') : t('ec.common.disable');
      },
      filters: [
        { text: t('ec.common.enable'), value: 'true' },
        { text: t('ec.common.disable'), value: 'false' },
      ],
    },
    {
      title: t('ec.system.role.readonly'),
      dataIndex: 'readonly',
      width: 110,
      format: (text: string) => {
        return text ? t('ec.common.yes') : t('ec.common.no');
      },
      filters: [
        { text: t('ec.common.yes'), value: 'true' },
        { text: t('ec.common.no'), value: 'false' },
      ],
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
    label: t('ec.system.role.code'),
    field: 'code',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    label: t('ec.system.role.name'),
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
export const editFormSchema = (type: Ref<ActionEnum>): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('ec.system.role.category'),
      field: 'category',
      component: 'ApiRadioGroup',
      defaultValue: RoleCategoryEnum.FUNCTION,
      componentProps: {
        ...dictComponentProps(DictEnum.ROLE_CATEGORY),
      },
      helpMessage: [
        '功能角色：不同的角色，拥有不同的菜单、按钮、URI权限',
        '桌面角色：不同的角色，拥有不同的首页桌面（待开发）',
        '数据角色：不同的角色，拥有不同数据权限',
      ],
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('ec.system.role.code'),
      field: 'code',
      component: 'Input',
      dynamicDisabled: ({ values }) => {
        return !!values?.id;
      },
    },
    {
      label: t('ec.system.role.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('ec.system.role.describe'),
      field: 'describe',
      component: 'Input',
    },
    {
      label: t('ec.system.role.state'),
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
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (type): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'code',
      type: RuleType.append,
      rules: [
        {
          trigger: 'blur',
          async validator(_, value) {
            if (unref(type) === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (value && (await check(value))) {
              return Promise.reject('角色编码已经存在，不允许重复！');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};

export const roleUserFormSchema: FormSchema[] = [
  {
    field: 'roleId',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: '用户',
    field: 'userIdList',
    slot: 'userIdList',
    component: 'Transfer',
  },
];

// 角色-员工列表字段
export const roleUserColumns = (enumMap?: object, dictMap?: object): BasicColumn[] => {
  return [
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
// 角色-员工搜索字段
export const roleUserSearchFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'account',
      label: t('ec.org.user.account'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'name',
      label: t('ec.org.user.name'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'orgIdList',
      label: '所在部门',
      component: 'ApiTreeSelect',
      componentProps: {
        api: tree,
        labelField: 'label',
        valueField: 'id',
        allowClear: true,
        multiple: true,
      },
      colProps: { span: 8 },
    },
    {
      field: 'scope',
      label: '范围',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: '全部', value: '-1' },
          { label: '已绑定', value: '1' },
          { label: '未绑定', value: '2' },
        ],
      },
      defaultValue: '-1',
      colProps: { span: 8 },
    },
  ];
};
