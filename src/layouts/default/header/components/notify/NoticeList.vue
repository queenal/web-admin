<template>
  <a-list :class="prefixCls" bordered>
    <template v-for="item in getData" :key="item.id">
      <a-list-item class="list-item">
        <a-list-item-meta>
          <template #title>
            <div class="title">
              <a-typography-paragraph
                @click="handleTitleClick(item)"
                style="width: 100%; margin-bottom: 0 !important"
                :style="{ cursor: isTitleClickable ? 'pointer' : '' }"
                :delete="!!item.isRead"
                :ellipsis="
                  $props.titleRows > 0 ? { rows: $props.titleRows, tooltip: !!item.title } : false
                "
                :content="item.title"
              />
            </div>
          </template>

          <template #description>
            <div>
              <div class="datetime">日期：{{ item.createTime }} 发布者:{{ item.author }}</div>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
    <template #loadMore>
      <div
        :style="{
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px',
        }"
        v-if="value.total > 0"
      >
        <a href="javascript:void(0);" @click="loadMore(msgType)"> 查看全部 >> </a>
      </div>
    </template>
  </a-list>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { List, Typography } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { PageResult } from '/@/api/model/baseModel';
  import { MsgPageResult } from '/@/api/ec/resources/model/msgModel';
  import { MsgTypeEnum } from '/@/enums/commonEnum';

  export default defineComponent({
    components: {
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      ATypographyParagraph: Typography.Paragraph,
    },
    props: {
      value: {
        type: Object as PropType<PageResult<MsgPageResult>>,
        default: () => {},
      },
      titleRows: {
        type: Number,
        default: 1,
      },
      msgType: {
        type: String,
        default: MsgTypeEnum.TO_DO,
      },
      onTitleClick: {
        type: Function as PropType<(Recordable) => void>,
      },
    },
    emits: ['update:currentPage'],
    setup(props) {
      const { prefixCls } = useDesign('header-notify-list');
      const { replace } = useRouter();
      const getData = computed(() => {
        const { value } = props;
        return value.records;
      });

      const isTitleClickable = computed(() => !!props.onTitleClick);

      function handleTitleClick(item: MsgPageResult) {
        props.onTitleClick && props.onTitleClick(item);
      }

      function loadMore(msgType: string) {
        replace({
          name: '通知公告',
          query: { msgType: msgType },
        });
      }
      return { prefixCls, getData, handleTitleClick, isTitleClickable, loadMore };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-header-notify-list';

  .@{prefix-cls} {
    &::-webkit-scrollbar {
      display: none;
    }

    ::v-deep(.ant-pagination-disabled) {
      display: inline-block !important;
    }

    &-item {
      padding: 6px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s;

      .title {
        margin-bottom: 8px;
        font-weight: normal;

        .extra {
          float: right;
          margin-top: -1.5px;
          margin-right: 0;
          font-weight: normal;

          .tag {
            margin-right: 0;
          }
        }

        .avatar {
          margin-top: 4px;
        }

        .description {
          font-size: 12px;
          line-height: 18px;
        }

        .datetime {
          margin-top: 4px;
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
</style>
