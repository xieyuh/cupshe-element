import { Ref, ref, onMounted, nextTick } from 'vue';
import { useRect } from '.';

export const useHeight = (element: Element | Ref<Element | undefined>) => {
  const height = ref<number>();

  const setHeight = () => {
    height.value = useRect(element).height;
  };

  onMounted(() => {
    nextTick(setHeight);
    // https://github.com/youzan/vant/issues/10131
    setTimeout(setHeight, 100);
  });

  return height;
};
