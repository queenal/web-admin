import { Ref, unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { ActionEnum, DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt, RuleType } from '/@/api/ec/common/formValidateService';
import { check } from '/@/api/ec/system/resource';
import { DataScopeEnum, ResourceTypeEnum } from '/@/enums/biz/authority';
import { dictComponentProps, stateComponentProps, yesNoComponentProps } from '/@/utils/ec/common';

const { t } = useI18n();

// 资源表格
export const resourceColumns: BasicColumn[] = [
  {
    title: t('ec.system.resource.code'),
    dataIndex: 'code',
    width: 180,
  },
  {
    title: t('ec.system.resource.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('ec.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];
// 资源搜索
export const resourceSearchFormSchema: FormSchema[] = [
  {
    label: t('ec.system.resource.code'),
    field: 'code',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    label: t('ec.system.resource.name'),
    field: 'name',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'createTimeRange',
    label: t('ec.common.createTime'),
    component: 'RangePicker',
    colProps: { span: 12 },
  },
];

export const resourceCustomFormSchemaRules = (type): Partial<FormSchemaExt>[] => {
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
              return Promise.reject('资源编码已经存在，不允许重复！');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};
// 资源编辑表单
export const resourceEditFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'menuId',
    label: '所属菜单',
    component: 'Input',
    show: false,
  },
  {
    field: 'menuName',
    label: '所属菜单',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('ec.system.resource.code'),
    field: 'code',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values?.id;
    },
    helpMessage: [
      '参考shiro的权限配置方式，使用:',
      ' ; 作为权限编码分隔符',
      ' : 作为功能层级分隔符',
      ' , 作为多个功能点的分隔符',
      ' * 作为任意通配符',
      '并且： 建议以view、add、edit、delete、export、import、download、upload等关键词结尾',
      '如：authority:menu:add 只有菜单新增权限',
      '如：tenant:tenant:initConnect;tenant:datasourceConfig:view 租户初始化和数据源查询权限',
      '如：authority:resource:* 资源模块任意权限',
      '如：msg:sms:add,edit 短信功能的新增和修改权限',
    ],
  },
  {
    label: t('ec.system.resource.name'),
    field: 'name',
    component: 'Input',
  },
  {
    label: t('ec.system.resource.describe'),
    field: 'describe',
    component: 'InputTextArea',
    componentProps: {
      'auto-size': { minRows: 2, maxRows: 3 },
    },
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
      field: 'parentId',
      label: t('ec.system.menu.parentId'),
      component: 'TreeSelect',
      componentProps: {
        replaceFields: {
          title: 'label',
          key: 'id',
          value: 'id',
        },
        treeNodeFilterProp: 'title',
        getPopupContainer: () => document.body,
      },
      dynamicDisabled: ({ values }) => {
        return !!values?.id;
      },
    },
    {
      label: t('ec.system.menu.label'),
      field: 'label',
      component: 'Input',
    },
    {
      label: t('ec.system.menu.resourceType'),
      field: 'resourceType',
      component: 'ApiRadioGroup',
      defaultValue: ResourceTypeEnum.MENU,
      componentProps: {
        ...dictComponentProps(DictEnum.RESOURCE_TYPE),
      },
      helpMessage: [
        '菜单：即左侧显示的菜单(肉眼可见的菜单)(包括N级菜单)',
        '数据：即页面或视图请求后台接口时，返回不同的数据，参考 用户管理、岗位管理',
      ],
      colProps: {
        span: 24,
      },
      dynamicRules: ({ model }) => {
        return [
          { required: true, message: '不能为空' },
          {
            trigger: 'change',
            validator: async (_, value) => {
              if (type.value === ActionEnum.VIEW) {
                return Promise.resolve();
              }
              if (model?.parentId === '0' || !model?.parentId) {
                if (value === ResourceTypeEnum.DATA) {
                  return Promise.reject('根节点下不能添加数据');
                }
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },

    {
      label: t('ec.system.menu.state'),
      field: 'state',
      component: 'Switch',
      defaultValue: true,
      componentProps: {
        ...stateComponentProps(),
        'checked-children': t('ec.common.enable'),
        'un-checked-children': t('ec.common.disable'),
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('ec.system.menu.isGeneral'),
      field: 'isGeneral',
      component: 'Switch',
      defaultValue: false,
      componentProps: {
        ...yesNoComponentProps(),
        'checked-children': t('ec.common.yes'),
        'un-checked-children': t('ec.common.no'),
      },
      helpMessage: '无需分配给角色，大家都拥有的菜单',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('ec.system.menu.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
      componentProps: {
        style: { width: '100%' },
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('ec.system.menu.group'),
      field: 'group',
      component: 'Input',
      helpMessage: '一个应用中有多组不同的菜单时使用',
      colProps: {
        span: 12,
      },
    },

    {
      label: t('ec.system.menu.path'),
      field: 'path',
      component: 'Input',
      helpMessage: '浏览器地址栏 # 号后的路径',
      ifShow: ({ values }) => {
        return values.resourceType === ResourceTypeEnum.MENU;
      },
    },
    {
      label: t('ec.system.menu.component'),
      field: 'component',
      component: 'Input',
      helpMessage: '前端项目src/views后的页面路径',
      ifShow: ({ values }) => {
        return values.resourceType === ResourceTypeEnum.MENU;
      },
    },

    {
      label: t('ec.system.menu.icon'),
      field: 'icon',
      component: 'IconPicker',
      ifShow: ({ values }) => {
        return values.resourceType === ResourceTypeEnum.MENU;
      },
    },

    {
      label: t('ec.system.menu.dataScope'),
      field: 'dataScope',
      component: 'ApiRadioGroup',
      defaultValue: DataScopeEnum.SELF,
      componentProps: {
        ...dictComponentProps(DictEnum.RESOURCE_DATA_SCOPE),
      },
      ifShow: ({ values }) => {
        return values.resourceType === ResourceTypeEnum.DATA;
      },
      helpMessage: [
        '每种数据范围对应一个DataScopeProvider接口的实现类，',
        '“自定义”需要自己编写实现类，并implements DataScopeProvider',
      ],
      colProps: {
        span: 24,
      },
    },
    {
      label: t('ec.system.menu.isDef'),
      field: 'isDef',
      component: 'Switch',
      defaultValue: false,
      componentProps: {
        ...yesNoComponentProps(),
        'checked-children': t('ec.common.yes'),
        'un-checked-children': t('ec.common.no'),
      },
      ifShow: ({ values }) => {
        return values.resourceType === ResourceTypeEnum.DATA;
      },
      helpMessage: [
        '若某个菜单或视图决定后台接口启用了数据权限，请至少为该菜单或视图配置一个默认数据权限',
      ],
      colProps: {
        span: 12,
      },
    },
    {
      label: t('ec.system.menu.customClass'),
      field: 'customClass',
      component: 'Input',
      ifShow: ({ values }) => {
        return (
          values.resourceType === ResourceTypeEnum.DATA && values.dataScope === DataScopeEnum.CUSTOM
        );
      },
      colProps: {
        span: 12,
      },
      helpMessage: [
        '1. 自行创建一个类，并实现DataScopeProvider接口',
        '2. 在实现类上标记注解：@Component("DATA_SCOPE_XXXX")',
        '3. 在此参数上配置：DATA_SCOPE_XXXX',
      ],
      componentProps: {
        placeholder: '以"DATA_SCOPE_"为前缀的自定义实现类',
      },
      dynamicRules: ({ model }) => {
        return [
          {
            trigger: 'blur',
            async validator(_, value) {
              if (type.value === ActionEnum.VIEW) {
                return Promise.resolve();
              }
              if (model.dataScope === DataScopeEnum.CUSTOM && !value) {
                return Promise.reject('不能为空');
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },

    {
      label: t('ec.system.menu.describe'),
      field: 'describe',
      component: 'InputTextArea',
      componentProps: {
        'auto-size': { minRows: 2, maxRows: 3 },
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
