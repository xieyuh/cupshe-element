import type { Ref } from 'vue';
import type { DropdownProps } from './Dropdown';

export type DropdownDirection = 'up' | 'down';

export type DropdownProvide = {
  id: string;
  props: DropdownProps;
  offset: Ref<number>;
};
