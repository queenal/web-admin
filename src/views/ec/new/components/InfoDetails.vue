<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/3 w-full !md:mt-0 !mt-3"
        :class="[index + 1 < 3 && '!md:mr-3']"
        :canExpan="false"
      >
        <div class="flex justify-between px-4 py-4">
          <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>
        <div class="flex justify-between p-2 px-4">
          <span>{{ item.date }}</span>
        </div>
      </Card>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { growCardList } from '../data';
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';

  export default defineComponent({
    name: 'InfoDetails',
    components: { CountTo, Icon },
    setup() {
      const loading = ref(false);

      return {
        dayImg: ref(),
        monthImg: ref(),
        yearImg: ref(),
        growCardList,
        loading,
      };
    },
  });
</script>
<style lang="less" scoped></style>
