<template>
  <demo-block title="基础图标">
    <c-row>
      <c-col v-for="icon in icons" :key="icon" span="6" @click="copy(icon)">
        <c-icon :name="icon" />
        <span>{{ icon }}</span>
      </c-col>
    </c-row>
  </demo-block>
</template>

<script lang="ts" setup>
import { Toast } from '../../toast';

function copyToClipboard(str: string) {
  navigator.clipboard.writeText(str);
}

const icons = [
  'arrow_down',
  'arrow_up',
  'arrow_left',
  'arrow_right',
  'close',
  'plus',
  'minus',
  'tick',
  'search',
  'account',
  'bag',
  'dislike',
  'like',
  'safe',
  'shippinginfo',
  'sizefit',
  'sizeguide',
  'package',
  'info',
  'delete',
  'copy',
  'iphone',
  'edit',
  'chat',
  'email',
  'ticket',
  'share',
  'update',
  'giftcard',
  'sale',
  'sort',
  'filter',
  'password_on',
  'password_off',
  'points',
  'time',
  'video',
  'warning',
  'question',
  'success',
  'failure',
  'right',
  'left',
  'menu',
  'country',
  'wishlist_nor',
  'wishlist_pre',
  'star',
  'star_full',
  'star_half',
  'play',
  'pause',
  'nextstep',
  'update_delete',
  'video_full',
  'account_sel',
  'down_full',
  'account2_full',
  'delivery_full',
  'other_full',
  'package_full',
  'payment_full',
  'safe_full',
  'update_full',
  'size_full',
  'sunchasers_full',
  'ticket_full',
  'returns_full',
  'giftcard_full',
  'sale_full',
  'addaddress',
  'success_full',
  'left_full',
  'right_full',
  'question_full',
  'info_full',
  'dislike_full',
  'like_full',
  'share_facebook',
  'share_linkin',
  'share_pinterest',
  'share_instagram',
  'share_tiktok',
  'share_twitter',
  'share_messenger',
  'share_youtube',
  'share_snapchat',
  'share_whats',
  'share_mail',
  'icon_shop',
  'return_documents',
  'contact',
  'return_successde',
  'return_successau',
  'return_instructions',
  'afterpay',
  'birthday',
  'exclusivediscounts',
  'freeshipping_fast',
  'klarna',
  'freeshipping',
  'zahlen',
];

const copy = (icon: string) => {
  const tag = `<c-icon name="${icon}" />`;
  copyToClipboard(tag);

  Toast({
    type: 'success',
    duration: 1500,
    className: 'demo-icon-notify',
    message: '已复制',
  });
};
</script>

<style lang="less">
.demo-icon {
  background: #fff;
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
      color: #646566;
      font-size: 12px;
      line-height: 18px;
    }

    &:active {
      background-color: #f2f3f5;
    }
  }

  .c-icon {
    margin: 16px 0 16px;
    color: #333;
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
