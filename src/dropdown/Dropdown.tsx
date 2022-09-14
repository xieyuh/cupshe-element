import {
  defineComponent,
  ref,
  computed,
  ExtractPropTypes,
  InjectionKey,
  CSSProperties,
} from 'vue';
import {
  createNamespace,
  truthProp,
  isDef,
  windowHeight,
  numericProp,
  makeNumericProp,
  makeStringProp,
  HAPTICS_FEEDBACK,
  ComponentInstance,
} from '../utils';
import {
  useId,
  useChildren,
  useScrollParent,
  useRect,
  useClickAway,
  useEventListener,
} from '../composables';
import type { DropdownProvide, DropdownDirection } from './types';

import { Icon } from '../icon';

const [name, bem] = createNamespace('dropdown');

const dropdownProps = {
  overlay: truthProp,
  zIndex: numericProp,
  duration: makeNumericProp(0.2),
  direction: makeStringProp<DropdownDirection>('down'),
  activeColor: String,
  closeOnClickOutside: truthProp,
  closeOnClickOverlay: truthProp,
};

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>;

export const DROPDOWN_KEY: InjectionKey<DropdownProvide> = Symbol(name);

export default defineComponent({
  name,

  props: dropdownProps,

  setup(props, { slots }) {
    const id = useId();
    const root = ref<HTMLElement>();
    const barRef = ref<HTMLElement>();
    const offset = ref(0);

    const { children, linkChildren } = useChildren(DROPDOWN_KEY);
    const scrollParent = useScrollParent(root);

    const opened = computed(() =>
      children.some((item) => item.state.showWrapper)
    );

    const barStyle = computed<CSSProperties | undefined>(() => {
      if (opened.value && isDef(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1,
        };
      }
    });

    const onClickAway = () => {
      if (props.closeOnClickOutside) {
        children.forEach((item) => {
          item.toggle(false);
        });
      }
    };

    const updateOffset = () => {
      if (barRef.value) {
        const rect = useRect(barRef);
        if (props.direction === 'down') {
          offset.value = rect.bottom;
        } else {
          offset.value = windowHeight.value - rect.top;
        }
      }
    };

    const onScroll = () => {
      if (opened.value) {
        updateOffset();
      }
    };

    const toggleItem = (active: number) => {
      children.forEach((item, index) => {
        if (index === active) {
          updateOffset();
          item.toggle();
        } else if (item.state.showPopup) {
          item.toggle(false, { immediate: true });
        }
      });
    };

    const renderTitle = (item: ComponentInstance, index: number) => {
      const { showPopup } = item.state;
      const { disabled, titleClass } = item;

      return (
        <div
          id={`${id}-${index}`}
          role="button"
          tabindex={disabled ? undefined : 0}
          class={[bem('item', { disabled }), { [HAPTICS_FEEDBACK]: !disabled }]}
          onClick={() => {
            if (!disabled) {
              toggleItem(index);
            }
          }}
        >
          <span
            class={[bem('title'), titleClass]}
            style={{ color: showPopup ? props.activeColor : '' }}
          >
            <div class="c-ellipsis">
              {item.renderTitle()}
              <Icon
                class={bem('icon', { active: showPopup })}
                name="arrow_down"
              />
            </div>
          </span>
        </div>
      );
    };

    linkChildren({ id, props, offset });
    useClickAway(root, onClickAway);
    useEventListener('scroll', onScroll, {
      target: scrollParent,
      passive: true,
    });

    return () => (
      <div ref={root} class={bem()}>
        <div
          ref={barRef}
          style={barStyle.value}
          class={bem('bar', { opened: opened.value })}
        >
          {children.map(renderTitle)}
        </div>
        {slots.default?.()}
      </div>
    );
  },
});
