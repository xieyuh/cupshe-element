import { defineComponent, computed, nextTick, ref, watch } from 'vue';
import { addUnit, createNamespace, unknownProp } from '../utils';
import { useParent, raf, doubleRaf, useExpose } from '../composables';
import { Icon } from '../icon';
import { COLLAPSE_KEY } from '../collapse';

const [name, bem] = createNamespace('collapse-item');

export default defineComponent({
  name,

  props: {
    name: [String, Number],
    title: [String, Number],
    titleClass: unknownProp,
    icon: String,
    disabled: Boolean,
  },

  setup(props, { slots }) {
    const wrapperRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const { parent, index } = useParent(COLLAPSE_KEY);

    const name = computed(() => props.name ?? index.value);
    const expanded = computed<boolean>(() => parent!.isExpanded(name.value));
    const { size, theme, border, gutter } = parent!.props;

    const show = ref(expanded.value);

    const style = computed(() => {
      if (index.value === 0) {
        return;
      }

      return {
        marginTop: addUnit(gutter),
      };
    });

    const onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false;
      } else {
        wrapperRef.value!.style.height = '';
      }
    };

    watch(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }

      if (value) {
        show.value = true;
      }

      const tick = value ? nextTick : raf;

      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }

        const { offsetHeight } = contentRef.value;

        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapperRef.value.style.height = value ? '0' : contentHeight;

          doubleRaf(() => {
            wrapperRef.value!.style.height = value ? contentHeight : '0';
          });
        } else {
          onTransitionEnd();
        }
      });
    });

    const toggle = (newValue = !expanded.value) => {
      parent!.toggle(name.value, newValue);
    };

    const onClickTitle = () => {
      if (!props.disabled) {
        toggle();
      }
    };

    const rightIcon = computed(() => {
      if (props.icon) {
        return props.icon;
      }

      return 'arrow_down';
    });

    useExpose({ toggle });

    return () => (
      <div class={bem({ border: index && border })} style={style.value}>
        <div
          class={[
            bem('title', [
              size,
              theme,
              {
                disabled: props.disabled,
                expanded: expanded.value,
                borderless: !border,
              },
            ]),
            props.titleClass,
          ]}
          aria-expanded={expanded.value}
          onClick={onClickTitle}
        >
          <div class={bem('title-content')}>
            {slots.title ? slots.title() : props.title}
          </div>
          {slots.icon ? (
            slots.icon({ expanded })
          ) : (
            <Icon class={bem('right-icon')} name={rightIcon.value} />
          )}
        </div>
        <div
          v-show={show.value}
          ref={wrapperRef}
          class={bem('wrapper', [theme])}
          onTransitionend={onTransitionEnd}
        >
          <div class={bem('content')} ref={contentRef}>
            {slots.default?.()}
          </div>
        </div>
      </div>
    );
  },
});
