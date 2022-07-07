import type { UnwrapRef, Ref, WritableComputedRef, DeepReadonly } from 'vue';
import { reactive, readonly, computed, getCurrentInstance, watchEffect, unref, toRaw } from 'vue';

import { isEqual } from 'lodash-es';

export function useRuleFormItem<T extends Recordable, K extends keyof T, V = UnwrapRef<T[K]>>(
  props: T,
  key?: K,
  changeEvent?,
  emitData?: Ref<any[]>,
): [WritableComputedRef<V>, (val: V) => void, DeepReadonly<V>];

export function useRuleFormItem<T extends Recordable>(
  props: T,
  key: keyof T = 'value',
  changeEvent = 'change',
  emitData?: Ref<any[]>,
) {
  const instance = getCurrentInstance();
  const emit = instance?.emit;

  const innerState = reactive({
    value: props[key],
  });

  const defaultState = readonly(innerState);

  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val as T[keyof T];
  };

  watchEffect(() => {
    innerState.value = props[key];
  });

  const state: any = computed({
    get() {
      return innerState.value;
    },
    set(value) {
      if (isEqual(value, defaultState.value)) return;

      innerState.value = value as T[keyof T];
      /*
       ant design vue 官方文档 https://next.antdv.com/components/select-cn
       antdv 官方的select组件的change事件支持2个参数： function(value, option:Option/Array<Option>)
       即：下方代码中的 value 和 ...(toRaw(unref(emitData)) || [])
       1. nextTick 后调用 changeEvent 会导致 value 为上一次的值！
       2. 注释nextTick后调用 changeEvent 会导致 emitData 为上一次的值！

      也就是说，不管加不加nextTick都有bug，但加了nextTick产生的bug影响更大（同时影响ApiTree和ApiRadioGroup组件的表单校验），故先将nextTick注释。
       */
      // nextTick(() => {
      emit?.(changeEvent, value, ...(toRaw(unref(emitData)) || []));
      // });
    },
  });

  return [state, setState, defaultState];
}
