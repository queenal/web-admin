<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { handleFetchParams } from '/@/utils/ec/common';
  import { EnumEnum } from '/@/enums/commonEnum';
  import { findEnumList } from '/@/api/ec/common/general';
  import { page } from '/@/api/ec/resources/smsSendStatus';
  import { sendStatusColumns as columns, sendStatusSearchFormSchema } from './smsTask.data';

  export default defineComponent({
    name: 'SmsSendStatusManagement',
    components: { BasicTable, PageWrapper },
    setup() {
      const { t } = useI18n();
      const { currentRoute } = useRouter();

      const taskId = ref<string>('0');
      // 表格
      const [registerTable, { reload, setColumns }] = useTable({
        title: t('ec.resources.smsSendStatus.table.title'),
        api: page,
        columns: columns(),
        formConfig: {
          labelWidth: 120,
          schemas: sendStatusSearchFormSchema,
        },
        beforeFetch: handleFetchParams,
        searchInfo: {
          taskId,
        },
        immediate: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        rowKey: 'id',
      });

      onMounted(async () => {
        const enumMap = await findEnumList(EnumEnum.SendStatus);
        setColumns(columns(enumMap));

        const { params } = currentRoute.value;

        taskId.value = params?.id as string;
        reload();
      });

      return {
        t,
        registerTable,
      };
    },
  });
</script>
