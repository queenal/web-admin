<template>
  <div class="left-center">
    <div class="center-head">
      <span class="title">待办事项</span>
      <span class="operate">查看更多<i class="el-icon-arrow-right"></i></span>
    </div>
    <div class="manage-box">
      <Badge :count="100" class="item" :overflow-count="99" :offset="[18, 0]">
        <span @click="changeType('accept')" :class="{ active: manageType === 'accept' }"
          >收件管理</span
        >
      </Badge>
      <Badge :count="36" class="item" :offset="[15, 0]">
        <span @click="changeType('business')" :class="{ active: manageType === 'business' }"
          >业务管理</span
        >
      </Badge>
      <Badge :count="6" class="item" :offset="[10, 0]">
        <span @click="changeType('finish')" :class="{ active: manageType === 'finish' }"
          >办结管理</span
        >
      </Badge>
    </div>
    <div style="padding: 0 15px">
      <Table :dataSource="tableData" :columns="columns" :scroll="{ y: 140 }" :pagination="false" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Table, Badge } from 'ant-design-vue';
  import { tableData, columns } from '../data';

  export default defineComponent({
    name: 'TodoEvent',
    components: { Table, Badge },
    setup() {
      const manageType = ref('accept');
      const changeType = (type: string) => {
        manageType.value = type;
      };
      return {
        manageType,
        changeType,
        tableData,
        columns,
      };
    },
  });
</script>
<style lang="less" scoped>
  .left-center {
    margin: 15px 0;
    border-radius: 10px;
    background: #ffffff;

    .center-head {
      line-height: 40px;
      height: 40px;
      position: relative;
      margin-bottom: 12px;

      .title {
        padding-left: 20px;
        font-size: 16px;

        &:after {
          content: '';
          position: absolute;
          left: 16px;
          bottom: 1px;
          width: 70px;
          height: 2px;
          background-color: #4779b2;
          z-index: 1;
        }
      }

      .operate {
        float: right;
        padding-right: 15px;
        color: #b3b3b3;
        font-size: 12px;
        cursor: pointer;
      }

      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #ebebeb;
        z-index: 1;
      }
    }

    .manage-box {
      padding: 0 15px;
      height: 30px;

      .ant-badge:not(.ant-badge-not-a-wrapper) {
        margin-right: 50px;
      }

      span {
        cursor: pointer;
        color: #999999;
      }

      .active {
        color: #333333;
      }
    }
  }
</style>
