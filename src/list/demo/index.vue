<template>
  <c-list
    v-model:loading="list[0].loading"
    :finished="list[0].finished"
    finished-text="没有更多了"
    @load="onLoad(0)"
  >
    <c-cell v-for="item in list[0].items" :key="item" :title="item" />
  </c-list>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import '@cupshe/fonts';

export default {
  setup() {
    const state = reactive({
      list: [
        {
          items: [] as string[],
          refreshing: false,
          loading: false,
          error: false,
          finished: false,
        },
        {
          items: [] as string[],
          refreshing: false,
          loading: false,
          error: false,
          finished: false,
        },
        {
          items: [] as string[],
          refreshing: false,
          loading: false,
          error: false,
          finished: false,
        },
      ],
    });

    const onLoad = (index: number) => {
      const currentList = state.list[index];
      currentList.loading = true;

      setTimeout(() => {
        if (currentList.refreshing) {
          currentList.items = [];
          currentList.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          const text = currentList.items.length + 1;
          currentList.items.push(text < 10 ? '0' + text : String(text));
        }

        currentList.loading = false;
        currentList.refreshing = false;

        // show error info in second demo
        if (
          index === 1 &&
          currentList.items.length === 10 &&
          !currentList.error
        ) {
          currentList.error = true;
        } else {
          currentList.error = false;
        }

        if (currentList.items.length >= 40) {
          currentList.finished = true;
        }
      }, 1000);
    };

    return {
      ...toRefs(state),
      onLoad,
    };
  },
};
</script>

<style lang="less">
.demo-list {
  .c-cell {
    text-align: center;
  }

  .page-desc {
    margin: 0;
    padding: 5px 0;
    font-size: 14px;
    text-align: center;

    &--text {
      margin: 0;
    }

    &--option {
      margin: 12px;
    }
  }
}
</style>
