<template>
  <CollapseContainer title="登录日志" :canExpan="false">
    <a-timeline mode="left">
      <a-timeline-item v-for="(item, index) of loginLogList" :key="index">
        <Card :title="'登录时间：' + item.createTime">
          <p>
            <Icon icon="ant-design:link-outlined" />
            {{ t('ec.system.loginLog.requestIp') }}：{{ item.requestIp }}
          </p>
          <p>
            <Icon icon="ant-design:environment-outlined" />
            {{ t('ec.system.loginLog.location') }}：{{ item.location }}
          </p>
          <p>
            <Icon icon="ant-design:chrome-filled" />
            {{ t('ec.system.loginLog.browser') }}：{{ item.browser }}
          </p>
          <p>
            <Icon icon="ant-design:windows-outlined" />
            {{ t('ec.system.loginLog.operatingSystem') }}：{{ item.operatingSystem }}
          </p>
        </Card></a-timeline-item
      >
    </a-timeline>
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Timeline, Card } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useUserStore } from '/@/store/modules/user';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { msgNotifyList } from './data';
  import { page } from '/@/api/ec/system/loginLog';
  import { LoginLog } from '/@/api/ec/system/model/loginLogModel';

  export default defineComponent({
    name: 'MyLoginLog',
    components: {
      CollapseContainer,
      [Timeline.name]: Timeline,
      [Timeline.Item.name]: Timeline.Item,
      Card,
      Icon,
    },
    setup() {
      const loginLogList = ref<LoginLog[]>([]);
      const userStore = useUserStore();
      const { t } = useI18n();
      onMounted(async () => {
        const list = await page({
          current: 1,
          size: 10,
          model: { userId: userStore.getUserInfo.id },
        });

        loginLogList.value = list.records;
      });

      return {
        list: msgNotifyList,
        loginLogList,
        t,
      };
    },
  });
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
  }
</style>
