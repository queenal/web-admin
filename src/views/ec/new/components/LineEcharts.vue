<template>
  <div class="left-footer">
    <CollapseContainer class="" title="办件趋势" :canExpan="false">
      <div ref="tenVisitRef" :style="{ height: '280px', width: '100%' }"></div>
    </CollapseContainer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, onMounted } from 'vue';

  import { CollapseContainer } from '/@/components/Container/index';

  import { useECharts } from '/@/hooks/web/useECharts';
  import { areaLine } from '/@/utils/chartsOption';
  import type { EChartsOption } from 'echarts';

  export default defineComponent({
    name: 'LineEcharts',
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
        const visitBar = areaLine();
        visitBar.xAxis.data = [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ];
        visitBar.series.push({
          data: [30, 120, 140, 100, 160, 210, 300, 280, 290, 300, 250, 200],
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#F3CE47', //改变折线点的颜色
            },
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(243, 206, 71, 0.2)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(243, 206, 71, 0.01)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        });
        visitBar.series.push({
          data: [200, 220, 280, 290, 300, 320, 340, 350, 370, 300, 200, 100],
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#24adfe', //改变折线点的颜色
            },
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(36,173,254, 0.2)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(52,112,252, 0.01)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        });
        visitBar.series.shift();
        tenVisitSetOptions(visitBar as EChartsOption);
      };
      return {
        tenVisitRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  .left-footer {
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
  }
</style>
