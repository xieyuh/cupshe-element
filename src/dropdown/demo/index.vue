<template>
  <demo-block title="基础用法">
    <c-dropdown>
      <c-dropdown-item v-model="value1" :options="option1" />
      <c-dropdown-item v-model="value2" :options="option2" />
    </c-dropdown>
  </demo-block>

  <demo-block title="自定义菜单内容">
    <c-dropdown>
      <c-dropdown-item v-model="value1" :options="option1" />
      <c-dropdown-item title="Size" ref="item">
        <c-cell center title="Bikini">
          <template #right-icon>
            <c-switch v-model="switch1" size="24" />
          </template>
        </c-cell>
        <c-cell center title="Dress">
          <template #right-icon>
            <c-switch v-model="switch2" size="24" />
          </template>
        </c-cell>
        <div style="padding: 5px 16px">
          <c-button
            type="primary"
            block
            style="height: 40px"
            @click="onConfirm"
          >
            OK
          </c-button>
        </div>
      </c-dropdown-item>
    </c-dropdown>
  </demo-block>

  <!-- <demo-block :title="t('customActiveColor')">
    <c-dropdown active-color="#1989fa">
      <c-dropdown-item v-model="value1" :options="option1" />
      <c-dropdown-item v-model="value2" :options="option2" />
    </c-dropdown>
  </demo-block> -->

  <demo-block title="向上展开">
    <c-dropdown direction="up">
      <c-dropdown-item v-model="value1" :options="option1" />
      <c-dropdown-item v-model="value2" :options="option2" />
    </c-dropdown>
  </demo-block>

  <demo-block title="禁用菜单">
    <c-dropdown>
      <c-dropdown-item v-model="value1" disabled :options="option1" />
      <c-dropdown-item v-model="value2" disabled :options="option2" />
    </c-dropdown>
  </demo-block>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import CDropdown from '..';
import CDropdownItem from '../../dropdown-item';
import CCell from '../../cell';
import CSwitch from '../../switch';
import CButton from '../../button';
import type { DropdownItemInstance } from '../../dropdown-item';

const item = ref<DropdownItemInstance>();

const switch1 = ref(true);
const switch2 = ref(false);
const value1 = ref(0);
const value2 = ref('XS');

const option1 = computed(() => [
  { text: 'Featured', value: 0 },
  { text: 'Best Seller', value: 1 },
  { text: 'Newest', value: 2 },
]);
const option2 = computed(() => [
  { text: 'XS', value: 'XS' },
  { text: 'M', value: 'M' },
  { text: 'XL', value: 'XL' },
]);

const onConfirm = () => {
  item.value?.toggle();
};
</script>
