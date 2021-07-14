<template>
  <div :class="bem()">
    <span :class="[bem('symbol'), symbolClass]">{{ getSymbol() }}</span>
    <span :class="[bem('value'), valueClass]">{{ format() }}</span>
    <span
      v-if="showTitle"
      :class="[bem('title', [titlePosition]), titleClass]"
      >{{ title }}</span
    >
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { createNamespace, extend, isDef, padZero } from '../utils';
import { symbols, Symbol, Formatter } from './symbol';

const [name, bem] = createNamespace('currency');

export default {
  name,

  props: {
    valueClass: String,
    symbolClass: String,
    titleClass: String,
    value: [String, Number],
    formatter: Function as PropType<Formatter>,
    customSymbol: {
      type: Object as PropType<Record<string, string>>,
    },
    title: {
      type: String as PropType<Symbol>,
      default: 'USD',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    titlePosition: {
      type: String as PropType<'left' | 'right'>,
      default: 'right',
    },
    precision: {
      type: [String, Number],
      default: 2,
    },
    decimalSeparator: {
      type: String,
      default: '.',
    },
    groupSeparator: {
      type: String,
      default: ',',
    },
  },

  setup(props) {
    const format = () => {
      if (!isDef(props.value)) {
        return;
      }

      if (isDef(props.formatter)) {
        return props.formatter(props.value);
      }

      const val = String(props.value);
      const cells = val.match(/^(-?)(\d*)(\.(\d+))?$/);
      let int = cells[2] || '0';
      let decimal = cells[4] || '';
      int = int.replace(/\B(?=(\d{3})+(?!\d))/g, props.groupSeparator);
      decimal = padZero(decimal, +props.precision).slice(0, +props.precision);

      if (decimal) {
        decimal = props.decimalSeparator + decimal;
      }

      return int + decimal;
    };

    const getSymbol = () => {
      const map = extend({}, symbols, props.customSymbol);

      return map[props.title];
    };

    return {
      bem,
      format,
      getSymbol,
    };
  },
};
</script>
