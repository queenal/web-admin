<template>
  <div class="right-top">
    <div class="title">常用功能</div>
    <ul class="func-module">
      <li v-for="(item, index) in useOperation" :key="item.text + index">
        <!-- <img :src="item.img"/> -->
        <Icon :icon="item.icon" :size="40" />
        <div class="text" :title="item.text">{{ item.text }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { useOperation } from '../data';

  export default defineComponent({
    name: 'QuickPanel',
    components: { Icon },
    setup() {
      return {
        useOperation,
      };
    },
  });
</script>
<style lang="less" scoped>
  .right-top {
    height: 270px;
    background: #ffffff;
    position: relative;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 10px;

    &:before {
      content: '';
      height: 20px;
      position: absolute;
      left: 0;
      top: 25px;
      vertical-align: middle;
      border-right: 2px solid #4779b2;
    }

    .title {
      color: #333333;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .func-module {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      height: 199px;
      width: 100%;

      li {
        flex: 1;
        cursor: pointer;
        width: calc((100% - 10px) / 4);
        min-width: calc((100% - 10px) / 4);
        max-width: calc((100% - 10px) / 4);
        text-align: center;

        &:nth-child(4n) {
          // 去除第4n个的margin-right
          margin-right: 0;
        }

        img {
          width: 35px;
          height: 40px;
        }

        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
