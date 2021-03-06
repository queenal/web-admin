<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <div class="m-4">
      <a-button @click="handleAdd()" class="mr-2">{{ t('common.title.addRoot') }}</a-button>
      <a-button @click="handleBatchDelete()" class="mr-2">{{ t('common.title.delete') }}</a-button>
    </div>
    <BasicTree
      :title="t('ec.system.area.table.title')"
      toolbar
      checkable
      checkStrictly
      search
      :actionList="actionList"
      :beforeRightClick="getRightMenuList"
      :clickRowToExpand="true"
      :treeData="treeData"
      :load-data="onLoadData"
      @select="handleSelect"
      ref="treeRef"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, h } from 'vue';
  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { eachTree } from '/@/utils/helper/treeHelper';
  import {
    BasicTree,
    TreeItem,
    TreeActionItem,
    TreeActionType,
    ContextMenuItem,
  } from '/@/components/Tree';
  import { findNodeByKey } from '/@/utils/ec/common';

  import { linkage, remove } from '/@/api/ec/system/area';

  export default defineComponent({
    name: 'AreaManagement',
    components: { BasicTree },

    emits: ['select', 'add'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('树结构加载失败,请刷新页面');
        }
        return tree;
      }

      onMounted(() => {
        fetch();
      });

      // 加载数据
      async function fetch(parentId = '0') {
        treeData.value = (await linkage(parentId)) as unknown as TreeItem[];
        eachTree(treeData.value, (item) => {
          item.key = item.id;
          item.title = item.label;
          return item;
        });
      }

      const onLoadData = (treeNode: any) => {
        return new Promise(async (resolve: (value?: unknown) => void) => {
          if (treeNode.children && treeNode.children.length > 0) {
            resolve();
            return;
          }

          const children = (await linkage(treeNode.eventKey)) as unknown as TreeItem[];
          if (children && children.length > 0) {
            setChildren(treeData.value, children, treeNode.eventKey);
            resolve();
            return;
          }
          resolve();
        });
      };
      function setChildren(list: any[], children: any[], parentId: string) {
        for (const node of list) {
          if (node.id === parentId) {
            node.children = children;
            return;
          }
          if (node.children && node.children.length > 0) {
            setChildren(node.children, children, parentId);
          }
        }
      }

      // 选择节点
      function handleSelect(keys: string[]) {
        if (keys[0]) {
          const node = findNodeByKey(keys[0], treeData.value);
          const parent = findNodeByKey(node?.parentId, treeData.value);
          emit('select', parent, node);
        }
      }

      // 悬停图标
      const actionList: TreeActionItem[] = [
        {
          render: (node) => {
            return h(PlusOutlined, {
              class: 'ml-2',
              onClick: (e) => {
                e?.stopPropagation();
                e?.preventDefault();
                emit('add', findNodeByKey(node.id, treeData.value));
              },
            });
          },
        },
        {
          render: (node) => {
            return h(DeleteOutlined, {
              class: 'ml-2',
              onClick: (e) => {
                e?.stopPropagation();
                e?.preventDefault();
                batchDelete([node.id]);
              },
            });
          },
        },
      ];

      // 右键菜单
      function getRightMenuList(node: any): ContextMenuItem[] {
        return [
          {
            label: t('common.title.addChildren'),
            handler: () => {
              emit('add', findNodeByKey(unref(node).id, treeData.value));
            },
            icon: 'bi:plus',
          },
          {
            label: t('common.title.delete'),
            handler: () => {
              batchDelete([unref(node).id]);
            },
            icon: 'bx:bxs-folder-open',
          },
        ];
      }

      // 执行批量删除
      async function batchDelete(ids: string[]) {
        createConfirm({
          iconType: 'warning',
          content: '选中节点及其子结点将被永久删除, 是否确定删除？',
          onOk: async () => {
            await remove(ids);
            createMessage.success(t('common.tips.deleteSuccess'));
            fetch();
          },
        });
      }

      // 点击组织数外面的 新增
      function handleAdd() {
        emit('add', findNodeByKey('0', treeData.value));
      }

      // 点击组织数外面的 批量删除
      function handleBatchDelete() {
        const { checked } = getTree().getCheckedKeys() as {
          checked: string[];
          halfChecked: string[];
        };
        if (!checked || checked.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        batchDelete(checked);
      }

      return {
        t,
        treeRef,
        treeData,
        fetch,
        handleAdd,
        handleBatchDelete,
        getRightMenuList,
        actionList,
        handleSelect,
        onLoadData,
      };
    },
  });
</script>
