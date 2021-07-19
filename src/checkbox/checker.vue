<template>
  <div
    :role="role"
    :class="
      bem([
        {
          disabled: isDisabled,
          'label-disabled': labelDisabled,
        },
      ])
    "
    :tabindex="isDisabled ? -1 : 0"
    :aria-checked="checked"
    @click="onClick"
  >
    <div
      :class="
        bem('icon', {
          disabled: isDisabled,
          checked,
        })
      "
      ref="iconRef"
      :style="{ fontSize: iconSize }"
    >
      <c-icon name="tick" :style="iconStyle" />
    </div>
    <template v-if="$slots.default">
      <span :class="bem('label', [{ disabled: isDisabled }])">
        <slot />
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, computed, PropType, CSSProperties } from 'vue';
import { extend, unknownProp, truthProp, addUnit } from '../utils';

export type CheckerDirection = 'horizontal' | 'vertical';

export type CheckerParent = {
  props: {
    disabled?: boolean;
    iconSize?: number | string;
    checkedColor?: string;
  };
};

export const checkerProps = {
  name: unknownProp,
  disabled: Boolean,
  iconSize: [Number, String],
  modelValue: unknownProp,
  checkedColor: String,
  labelDisabled: Boolean,
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
    const iconRef = ref<HTMLElement>();

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

    const iconStyle = computed<CSSProperties>(() => {
      const checkedColor = props.checkedColor || getParentProps('checkedColor');

      if (checkedColor && props.checked && !isDisabled.value) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor,
        };
      }

      return {};
    });

    const onClick = (event: MouseEvent) => {
      const { target } = event;
      const icon = iconRef.value;
      const iconClicked = icon === target || icon!.contains(target as Node);

      if (!isDisabled.value && (iconClicked || !props.labelDisabled)) {
        emit('toggle');
      }
      emit('click', event);
    };

    const iconSize = props.iconSize || getParentProps('iconSize');

    return {
      iconStyle,
      iconSize: addUnit(iconSize),
      isDisabled,
      iconRef,
      onClick,
    };
  },
};
</script>
