<template>
  <demo-block title="基础图标">
    <c-row>
      <c-col span="6">
        <c-icon name="chat" />
      </c-col>
      <c-col span="6">
        <c-icon name="tick" />
      </c-col>
      <c-col span="6">
        <c-icon name="share_facebook" />
      </c-col>
    </c-row>
  </demo-block>

  <demo-block title="图标颜色">
    <c-row>
      <c-col span="6">
        <c-icon name="star" color="#1989fa" />
      </c-col>
      <c-col span="6">
        <c-icon name="share_twitter" color="#ee0a24" />
      </c-col>
      <c-col span="6">
        <c-icon name="sale_full" color="#07c160" />
      </c-col>
    </c-row>
  </demo-block>

  <demo-block title="图标大小">
    <c-row>
      <c-col span="6">
        <c-icon name="email" size="24" />
      </c-col>
      <c-col span="6">
        <c-icon name="info" size="2.5rem" />
      </c-col>
      <c-col span="6">
        <c-icon name="like_full" size="3rem" />
      </c-col>
    </c-row>
  </demo-block>
</template>

<script lang="ts">
import { ref } from 'vue';

// from https://30secondsofcode.org
function copyToClipboard(str: string) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  const selection = document.getSelection();

  if (!selection) {
    return;
  }

  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    selection.removeAllRanges();
    selection.addRange(selected);
  }
}

export default {
  setup() {
    const tab = ref(0);

    const copy = (icon: string, option: Record<string, unknown> = {}) => {
      let tag = `<c-icon name="${icon}"`;
      if ('dot' in option) {
        tag = `${tag} ${option.dot ? 'dot' : ''}`;
      }
      if ('badge' in option) {
        tag = `${tag} badge="${option.badge}"`;
      }
      if ('color' in option) {
        tag = `${tag} color="${option.color}"`;
      }
      if ('size' in option) {
        tag = `${tag} size="${option.size}"`;
      }
      tag = `${tag} />`;
      copyToClipboard(tag);

      // Notify({
      //   type: 'success',
      //   duration: 1500,
      //   className: 'demo-icon-notify',
      //   message: `${t('copied')}：${tag}`,
      // });
    };

    return {
      tab,
      copy,
      demoIcon: 'chat-o',
      demoImage: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-icon {
  background: @white;
  font-size: 0;

  &-list {
    box-sizing: border-box;
    min-height: calc(100vh - 65px);
    padding-top: 10px;
  }

  &-notify {
    font-size: 13px;
  }

  .c-col {
    display: inline-block;
    float: none;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;

    span {
      display: block;
      height: 36px;
      margin: -4px 0 4px;
      padding: 0 5px;
      color: @gray-7;
      font-size: 12px;
      line-height: 18px;
    }

    &:active {
      background-color: @active-color;
    }
  }

  .c-icon {
    margin: 16px 0 16px;
    color: @text-color;
    font-size: 32px;
  }

  .c-tab__pane {
    width: auto;
    margin: 20px;
    background-color: #fff;
    border-radius: 12px;
  }
}
</style>
