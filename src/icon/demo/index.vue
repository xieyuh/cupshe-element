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

const icons = [
  'arrow_down',
  'arrow_up',
  'arrow_left',
  'arrow_right',
  'close',
  'plus',
  'tick',
  'search',
  'wishlist_nor',
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
  'points',
  'time',
  'video',
  'warning',
  'question',
  'success',
  'failure',
  'right',
  'left',
  'minus',
  'menu',
  'play',
  'pause',
  'star',
  'country',
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
  'star_full',
  'star_half',
  'dislike_full',
  'like_full',
  'icon_shop',
  'nextstep',
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
  'return_documents',
  'contact',
  'return_successde',
  'return_successau',
  'return_instructions',
  'createaccount1',
  'afterpay',
  'anniversary',
  'birthday',
  'checkout',
  'facebook',
  'honorarymember',
  'instagram',
  'exclusivediscounts',
  'personalexposure',
  'product_4',
  'makeapurchase_au',
  'freeshipping_fast',
  'makeapurchase_de',
  'product_2',
  'product_6',
  'product_1',
  'klarna',
  'freeshipping',
  'product_7',
  'refer',
  'product_3',
  'redeem_coupon',
  'signin_monthly',
  'tierup',
  'product_5',
  'sale_early',
  'voucher_freeproduct',
  'subscribe',
  'surprisepackage',
  'zahlen',
  'valued_coupon',
  'writeareview',
  'afterpay_1',
  'afterpay_4',
  'afterpay_2',
  'afterpay_3',
  'checkbox_nor',
  'radio_sel',
  'checkbox_sel',
  'radio_nor',
];

const copy = (icon: string) => {
  const tag = `<c-icon name="${icon}"`;
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
