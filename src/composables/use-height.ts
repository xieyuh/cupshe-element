import { useRect } from './use-rect';
import { Ref, ref, onMounted, nextTick } from 'vue';

export const useHeight = (element: Element | Ref<Element | undefined>) => {
  const height = ref<number>();

  onMounted(() => {
    nextTick(() => {
      height.value = useRect(element).height;
    });
  });

  return height;
};
