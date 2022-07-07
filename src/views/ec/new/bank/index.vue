<template>
  <PageWrapper dense fixedHeight contentClass="flex" class="page-container">
    <!--   页面分为左部分（上中下）和右部分（上下） -->
    <div class="page-left analysis">
      <InfoDetails class="enter-y" />
      <TodoEvent />
      <LineEcharts />
    </div>
    <div class="page-right">
      <QuickPanel />
      <PieEcharts />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import InfoDetails from '../components/InfoDetails.vue';
  import LineEcharts from '../components/LineEcharts.vue';
  import PieEcharts from '../components/PieEcharts.vue';
  import QuickPanel from '../components/QuickPanel.vue';
  import TodoEvent from '../components/TodoEvent.vue';

  export default defineComponent({
    name: 'QuickPanel',
    components: { PageWrapper, InfoDetails, LineEcharts, PieEcharts, QuickPanel, TodoEvent },
    setup() {
      return {};
    },
  });
</script>
<style lang="less" scoped>
  .page-container {
    padding: 20px;

    .page-left {
      flex: 6.7;
      margin-right: 7px;
      width: 67%;
      height: 100%;
    }

    .page-right {
      margin-left: 7px;
      flex: 3.3;
      width: 33%;
    }
  }
</style>
