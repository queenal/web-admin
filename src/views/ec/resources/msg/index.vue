<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleBatchDelete">{{
          t('common.title.delete')
        }}</a-button>
        <a-button type="primary" @click="handleAdd">{{ t('common.title.add') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: t('common.title.view'),
              onClick: handleView.bind(null, record),
            },
            {
              label: t('common.title.copy'),
              onClick: handleCopy.bind(null, record),
            },
            {
              label: t('common.title.delete'),
              color: 'error',
              popConfirm: {
                title: t('common.tips.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';

  import { handleFetchParams } from '/@/utils/ec/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { page, remove } from '/@/api/ec/resources/msg';
  import { columns, searchFormSchema } from './msg.data';

  export default defineComponent({
    name: 'MsgManagement',
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const { replace } = useRouter();

      // 表格
      const [registerTable, { reload, getSelectRowKeys }] = useTable({
        title: t('ec.resources.msg.table.title'),
        api: page,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        beforeFetch: handleFetchParams,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          width: 160,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      // 弹出复制页面
      function handleCopy(record: Recordable, e) {
        e.stopPropagation();

        replace({
          name: 'msgEdit',
          params: { id: record.id },
          query: { type: ActionEnum.COPY },
        });
      }

      // 弹出新增页面
      function handleAdd() {
        replace({
          name: 'msgEdit',
          params: { id: '0' },
          query: { type: ActionEnum.ADD },
        });
      }

      // 弹出页面
      function handleView(record: Recordable, e) {
        e.stopPropagation();
        replace({
          name: 'msgEdit',
          params: { id: record.id },
          query: { type: ActionEnum.VIEW },
        });
      }

      // 新增或编辑成功回调
      function handleSuccess() {
        reload();
      }

      async function batchDelete(ids: any[]) {
        await remove(ids);
        createMessage.success(t('common.tips.deleteSuccess'));
        handleSuccess();
      }

      // 点击单行删除
      function handleDelete(record: Recordable, e) {
        e.stopPropagation();
        if (record?.id) {
          batchDelete([record.id]);
        }
      }

      // 点击批量删除
      function handleBatchDelete() {
        const ids = getSelectRowKeys();
        if (!ids || ids.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: t('common.tips.confirmDelete'),
          onOk: async () => {
            await batchDelete(ids);
          },
        });
      }

      return {
        t,
        registerTable,
        handleAdd,
        handleCopy,
        handleView,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
      };
    },
  });
</script>
