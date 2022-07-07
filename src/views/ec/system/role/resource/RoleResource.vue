<template>
  <PageWrapper dense fixedHeight contentClass="flex">
    <RoleList class="xl:w-1/5" @select="handleRoleSelect" ref="roleListRef" />
    <ResourceTree
      v-show="
        roleCategory === RoleCategoryEnum.FUNCTION || roleCategory === RoleCategoryEnum.DESKTOP
      "
      class="xl:w-4/5"
      @success="handleTreeSuccess"
      ref="treeRef"
    />
    <DataScopeTree
      v-show="roleCategory === RoleCategoryEnum.DATA_SCOPE"
      class="xl:w-4/5"
      @success="handleTreeSuccess"
      ref="dataScopeTreeRef"
    />
    <template #rightFooter>
      <a-button type="primary" color="warning" @click="resetFields">
        {{ t('common.resetText') }}
      </a-button>
      <a-button type="primary" @click="handleSubmit" class="ml-4">
        {{ t('common.saveText') }}
      </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import RoleList from '../resource/RoleList.vue';
  import ResourceTree from '../resource/ResourceTree.vue';
  import DataScopeTree from '../resource/DataScopeTree.vue';
  import { RoleCategoryEnum } from '/@/enums/biz/authority';

  export default defineComponent({
    name: 'RoleResource',
    components: { PageWrapper, RoleList, ResourceTree, DataScopeTree },
    setup() {
      const { t } = useI18n();
      const roleListRef = ref<any>(null);
      const treeRef = ref<any>(null);
      const dataScopeTreeRef = ref<any>(null);
      const { currentRoute } = useRouter();
      const roleCategory = ref<string>(RoleCategoryEnum.FUNCTION);

      // 获取树
      function getTreeRef() {
        return unref(treeRef);
      }
      function getDataScopeTreeRef() {
        return unref(dataScopeTreeRef);
      }

      function getRoleListRef() {
        return unref(roleListRef);
      }

      onMounted(() => {
        const { params } = currentRoute.value;
        getRoleListRef().setData(params.roleId);
      });
      // 选择角色
      function handleRoleSelect(record: Recordable = {}) {
        roleCategory.value = record.category;

        if (record.category === RoleCategoryEnum.FUNCTION) {
          getTreeRef().setData({ record });
        } else if (record.category === RoleCategoryEnum.DESKTOP) {
          // 临时处理，后续完善桌面权限的逻辑
          getTreeRef().setData({ record });
        } else {
          getDataScopeTreeRef().setData({ record });
        }
      }

      // 保存成功
      function handleTreeSuccess() {}

      function handleSubmit() {
        if (roleCategory.value === RoleCategoryEnum.FUNCTION) {
          getTreeRef().handleSubmit();
        } else if (roleCategory.value === RoleCategoryEnum.DESKTOP) {
          // 临时处理，后续完善桌面权限的逻辑
          getTreeRef().handleSubmit();
        } else {
          getDataScopeTreeRef().handleSubmit();
        }
      }
      function resetFields() {
        if (roleCategory.value === RoleCategoryEnum.FUNCTION) {
          getTreeRef().resetFields();
        } else if (roleCategory.value === RoleCategoryEnum.DESKTOP) {
          // 临时处理，后续完善桌面权限的逻辑
          getTreeRef().resetFields();
        } else {
          getDataScopeTreeRef().resetFields();
        }
      }
      return {
        t,
        roleListRef,
        dataScopeTreeRef,
        treeRef,
        handleRoleSelect,
        handleTreeSuccess,
        resetFields,
        handleSubmit,
        RoleCategoryEnum,
        roleCategory,
      };
    },
  });
</script>
