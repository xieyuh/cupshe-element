<template>
  <div
    :role="role"
    :class="
      bem([
        {
          disabled: isDisabled,
        },
        Direction,
      ])
    "
    :tabindex="isDisabled ? -1 : 0"
    :aria-checked="checked"
    @click="onClick"
  >
    <slot v-bind="{ checked, disabled: isDisabled }" name="icon">
      <div
        :class="
          bem('icon', {
            disabled: isDisabled,
            checked,
          })
        "
        :style="{ fontSize: iconSize }"
      >
        <c-icon name="tick" />
      </div>
    </slot>
    <span v-if="$slots.default" :class="bem('label', { disabled: isDisabled })">
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import { computed, PropType } from 'vue';
import { extend, unknownProp, truthProp, addUnit } from '../utils';

export type CheckerDirection = 'horizontal' | 'vertical';

export type CheckerParent = {
  props: {
    disabled?: boolean;
    iconSize?: number | string;
    direction?: CheckerDirection;
  };
};

export const checkerProps = {
  name: unknownProp,
  disabled: Boolean,
  iconSize: [Number, String],
  modelValue: unknownProp,
};

export default {
  props: extend({}, checkerProps, {
    role: String,
    parent: Object as PropType<CheckerParent | null>,
    checked: Boolean,
    bindGroup: truthProp,
    bem: {
      type: Function,
      required: true,
    },
  }),

  emits: ['click', 'toggle'],

  setup(props, { emit }) {
    const getParentProps = <T extends keyof CheckerParent['props']>(
      name: T
    ) => {
      if (props.parent && props.bindGroup) {
        return props.parent.props[name];
      }
    };

    const isDisabled = computed(
      () => getParentProps('disabled') || props.disabled
    );

    const Direction = computed(() => getParentProps('direction'));

    const onClick = (event: MouseEvent) => {
      if (!isDisabled.value) {
        emit('toggle');
      }
      emit('click', event);
    };

    const iconSize = props.iconSize || getParentProps('iconSize');

    return {
      iconSize: addUnit(iconSize),
      Direction,
      isDisabled,
      onClick,
    };
  },
};
</script>
