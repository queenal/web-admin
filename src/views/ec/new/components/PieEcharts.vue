<template>
  <div class="right-footer">
    <CollapseContainer class="container" title="本月超限许可概况" :canExpan="false">
      <div ref="tenVisitRef" :style="{ height: '238px', width: '100%' }"></div>
      <div ref="tenVisitRef1" :style="{ height: '238px', width: '100%' }"></div>
    </CollapseContainer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, onMounted } from 'vue';

  import { CollapseContainer } from '/@/components/Container/index';

  import { useECharts } from '/@/hooks/web/useECharts';
  import { complexPie } from '/@/utils/chartsOption';
  import type { EChartsOption } from 'echarts';

  export default defineComponent({
    name: 'PieEcharts',
    components: {
      CollapseContainer,
    },
    setup() {
      onMounted(() => {
        loadVisitList();
      });
      const tenVisitRef = ref<HTMLDivElement | null>(null);
      const tenVisitSetOptions = useECharts(tenVisitRef as Ref<HTMLDivElement>).setOptions;

      const loadVisitList = () => {
        const visitBar = complexPie(88);
        tenVisitSetOptions(visitBar as EChartsOption);
      };

      return {
        tenVisitRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  .right-footer {
    background: #ffffff;
    position: relative;
    padding: 15px;
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
      margin-bottom: 15px;
    }

    .pie-echarts {
      display: flex;
      flex-wrap: wrap;

      .pie {
        flex: 1;
        width: calc((100% - 10px) / 2);
        min-width: calc((100% - 10px) / 2);
        max-width: calc((100% - 10px) / 2);

        &:nth-child(2n) {
          // 去除第4n个的margin-right
          margin-right: 0;
        }
      }
    }
  }
</style>
