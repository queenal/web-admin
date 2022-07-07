<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    width="70%"
    :keyboard="true"
    :maskClosable="true"
    title="给角色绑定用户"
    :defaultFullscreen="true"
    @ok="handleSubmit"
  >
    <div ref="wrapEl">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" color="error" @click="handleBatchChoice">批量绑定</a-button>
          <a-button type="primary" @click="handleBatchCancel">批量取消</a-button>
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '绑定',
                onClick: handleBindUser.bind(null, record),
                ifShow: () => {
                  return !isEmpty(formData.roleId) && !formData.bindUserIds.includes(record.id);
                },
              },
              {
                label: '取消绑定',
                onClick: handleUnBindUser.bind(null, record),
                ifShow: () => {
                  return !isEmpty(formData.roleId) && formData.bindUserIds.includes(record.id);
                },
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRef } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useLoading } from '/@/components/Loading';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { isEmpty } from '/@/utils/is';
  import { saveRoleUser, userList } from '/@/api/ec/system/role';
  import { pageAll } from '/@/api/ec/org/user';
  import { handleFetchParams } from '/@/utils/ec/common';
  import { roleUserColumns, roleUserSearchFormSchema } from '../role.data';

  export default defineComponent({
    name: 'RoleUser',
    components: { BasicModal, BasicTable, TableAction },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const wrapEl = ref<ElRef>(null);
      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: wrapEl,
        props: {
          tip: '加载中...',
          absolute: true,
        },
      });

      const formData = reactive({
        roleId: '',
        bindUserIds: [] as string[],
      });

      // 表格
      const [registerTable, { getSelectRowKeys }] = useTable({
        title: '给角色绑定用户',
        api: pageAll,
        columns: roleUserColumns(),
        formConfig: {
          labelWidth: 70,
          schemas: roleUserSearchFormSchema(),
          autoSubmitOnEnter: true,
          resetButtonOptions: {
            preIcon: 'ant-design:rest-outlined',
          },
          submitButtonOptions: {
            preIcon: 'ant-design:search-outlined',
          },
          alwaysShowLines: 1,
        },
        beforeFetch: handleFetchParams,
        showIndexColumn: true,
        useSearchForm: true,
        showTableSetting: true,
        pagination: {
          pageSize: 10,
        },
        searchInfo: {
          roleId: toRef(formData, 'roleId'),
        },
        canResize: false,
        bordered: true,
        clickToRowSelect: false,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          width: 120,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });

        // 赋值
        formData.roleId = data?.record?.id;
        if (formData.roleId) {
          formData.bindUserIds = await userList(formData.roleId);
        } else {
          createMessage.warn('请选择角色');
        }
      });

      function handleSuccess() {}

      async function bindUser(flag: boolean, userIdList: string[]) {
        try {
          openWrapLoading();
          if (!formData.roleId) {
            createMessage.warn('请选择角色');
            return;
          }

          formData.bindUserIds = await saveRoleUser({
            flag,
            userIdList,
            roleId: formData.roleId,
          });
          createMessage.success('操作成功');
          handleSuccess();
        } finally {
          closeWrapLoading();
        }
      }

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      function handleBindUser(record: Recordable, e: Event) {
        e?.stopPropagation();
        if (record?.id) {
          bindUser(true, [record.id]);
        }
      }
      function handleUnBindUser(record: Recordable, e: Event) {
        e?.stopPropagation();
        if (record?.id) {
          bindUser(false, [record.id]);
        }
      }

      function handleBatchCancel() {
        const ids = getSelectRowKeys();
        if (!ids || ids.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: '确认要批量绑定选中的员工吗?',
          onOk: async () => {
            await bindUser(false, ids);
          },
        });
      }

      function handleBatchChoice() {
        const ids = getSelectRowKeys();
        if (!ids || ids.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: '确认要批量解绑选中的员工吗?',
          onOk: async () => {
            await bindUser(true, ids);
          },
        });
      }

      return {
        formData,
        t,
        isEmpty,
        wrapEl,
        registerModal,
        registerTable,
        handleBindUser,
        handleUnBindUser,
        handleSubmit,
        handleBatchCancel,
        handleBatchChoice,
      };
    },
  });
</script>
