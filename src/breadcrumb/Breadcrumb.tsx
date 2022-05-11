import { defineComponent, PropType } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('breadcrumb');

export type Route = {
  name: string;
  href?: string;
};

export default defineComponent({
  name,

  props: {
    routes: {
      type: Array as PropType<Route[]>,
      default: () => [],
    },
    separator: {
      type: String,
      default: '/',
    },
  },

  emits: ['click'],

  setup(props, { emit, slots }) {
    const renderSeparator = () => {
      if (props.separator) {
        return (
          <span class={bem('separator')} aria-hidden="true">
            {props.separator}
          </span>
        );
      }
    };

    const onClick = (item: Route) => () => {
      emit('click', item);
    };

    const renderRoute = (route: Route, index: number) => {
      if (slots.item) {
        return slots.item({ route, separator: props.separator, index });
      }

      let link: JSX.Element;

      if (route.href) {
        link = (
          <a class={bem('link')} href={route.href} onClick={onClick(route)}>
            {route.name}
          </a>
        );
      } else {
        link = (
          <span class={bem('text')} onClick={onClick(route)}>
            {route.name}
          </span>
        );
      }

      return (
        <span class={bem('item')}>
          {link}
          {renderSeparator()}
        </span>
      );
    };

    return () => (
      <nav class={bem()} role="navigation" aria-label="breadcrumbs">
        {props.routes.map(renderRoute)}
      </nav>
    );
  },
});
