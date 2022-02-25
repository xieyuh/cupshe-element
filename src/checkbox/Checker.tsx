import { computed, defineComponent, PropType } from 'vue';
import { addUnit, extend, truthProp, unknownProp } from '../utils';
import { Icon } from '../icon';

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
  iconSize: [String, Number],
  modelValue: unknownProp,
};

export default defineComponent({
  props: extend({}, checkerProps, {
    role: String,
    parent: Object as PropType<CheckerParent | null>,
    checked: Boolean,
    bindGroup: truthProp,
    bem: {
      type: Function,
      required: true as const,
    },
  }),

  emits: ['click', 'toggle'],

  setup(props, { emit, slots }) {
    const getParentProp = <T extends keyof CheckerParent['props']>(name: T) => {
      if (props.parent && props.bindGroup) {
        return props.parent.props[name];
      }
    };

    const disabled = computed(
      () => getParentProp('disabled') || props.disabled
    );

    const direction = computed(() => getParentProp('direction'));

    const onClick = (event: MouseEvent) => {
      if (!disabled.value) {
        emit('toggle');
      }
      emit('click', event);
    };

    const renderIcon = () => {
      const { bem, checked } = props;

      const iconSize = props.iconSize || getParentProp('iconSize');

      if (slots.icon) {
        return slots.icon({ checked, disabled: disabled.value });
      }

      return (
        <div
          class={bem('icon', { disabled: disabled.value, checked })}
          style={{ fontSize: addUnit(iconSize) }}
        >
          <Icon name="tick" />
        </div>
      );
    };

    const renderLabel = () => {
      if (slots.default) {
        return (
          <span class={props.bem('label', { disabled: disabled.value })}>
            {slots.default()}
          </span>
        );
      }
    };

    return () => (
      <div
        role={props.role}
        class={props.bem([
          direction.value,
          {
            disabled: disabled.value,
          },
        ])}
        tabindex={disabled.value ? -1 : 0}
        aria-checked={props.checked}
        onClick={onClick}
      >
        {renderIcon()}
        {renderLabel()}
      </div>
    );
  },
});
