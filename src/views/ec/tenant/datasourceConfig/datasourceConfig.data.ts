import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn, FormSchema } from '/@/components/Table';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('ec.tenant.datasourceConfig.name'),
    dataIndex: 'name',
    width: 120,
  },
  {
    title: t('ec.tenant.datasourceConfig.username'),
    dataIndex: 'username',
    width: 120,
  },
  {
    title: t('ec.tenant.datasourceConfig.password'),
    dataIndex: 'password',
    width: 120,
  },
  {
    title: t('ec.tenant.datasourceConfig.driverClassName'),
    dataIndex: 'driverClassName',
    width: 120,
  },
  {
    title: t('ec.tenant.datasourceConfig.url'),
    dataIndex: 'url',
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
    field: 'name',
    label: t('ec.tenant.datasourceConfig.name'),
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'username',
    label: t('ec.tenant.datasourceConfig.url'),
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

export const editFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'name',
    label: t('ec.tenant.datasourceConfig.name'),
    component: 'Input',
  },
  {
    field: 'username',
    label: t('ec.tenant.datasourceConfig.username'),
    component: 'Input',
  },
  {
    field: 'password',
    label: t('ec.tenant.datasourceConfig.password'),
    component: 'Input',
  },
  {
    field: 'url',
    label: t('ec.tenant.datasourceConfig.url'),
    component: 'Input',
  },
  {
    field: 'driverClassName',
    label: t('ec.tenant.datasourceConfig.driverClassName'),
    component: 'Input',
  },
];
