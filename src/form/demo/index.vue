<template>
  <demo-block title="基础用法">
    <c-form @submit="onSubmit">
      <c-form-item
        name="username"
        :rules="[{ required: true, message: 'username is required' }]"
      >
        <c-input
          v-model="state.form1.username"
          style="width: 100%"
          placeholder="Username"
        />
      </c-form-item>
      <c-form-item
        name="password"
        :rules="[{ required: true, message: 'username is required' }]"
      >
        <c-input
          v-model="state.form1.password"
          style="width: 100%"
          placeholder="Password"
        />
      </c-form-item>
      <c-form-item
        name="gender"
        :rules="[{ required: true, message: 'gender is required' }]"
      >
        <c-select
          v-model="state.form1.gender"
          placeholder="Gender"
          style="width: 100%"
          :options="[
            {
              text: 'male',
              value: 'male',
            },
            {
              text: 'female',
              value: 'female',
            },
          ]"
        />
      </c-form-item>
      <c-button block native-type="submit" type="primary">SUBMIT</c-button>
    </c-form>
  </demo-block>
  <demo-block title="表单布局">
    <c-form
      :layout="state.form2.layout"
      :label-align="state.form2.align"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      colon
    >
      <c-form-item name="layout" label="layout">
        <c-radio-group direction="horizontal" v-model="state.form2.layout">
          <c-radio name="horizontal">horizontal</c-radio>
          <c-radio name="vertical">vertical</c-radio>
        </c-radio-group>
      </c-form-item>
      <c-form-item name="align" label="align">
        <c-radio-group direction="horizontal" v-model="state.form2.align">
          <c-radio name="left">left</c-radio>
          <c-radio name="right">right</c-radio>
        </c-radio-group>
      </c-form-item>
      <c-form-item name="username" label="username">
        <c-input
          v-model="state.form1.username"
          style="width: 100%"
          placeholder="Username"
        />
      </c-form-item>
    </c-form>
  </demo-block>
  <demo-block title="实例调用">
    <c-form ref="form">
      <c-form-item
        name="username"
        :rules="[{ required: true, message: 'username is required' }]"
      >
        <c-input
          v-model="state.form3.username"
          style="width: 100%"
          placeholder="Username"
        />
      </c-form-item>
      <c-form-item
        name="password"
        :rules="[{ required: true, message: 'username is required' }]"
      >
        <c-input
          v-model="state.form3.password"
          style="width: 100%"
          placeholder="Password"
        />
      </c-form-item>
      <c-button block type="primary" @click="onSubmit2">SUBMIT</c-button>
    </c-form>
  </demo-block>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const state: any = reactive({
  form1: {
    username: '',
    password: '',
    gender: '',
  },
  form2: {
    layout: 'horizontal',
    align: 'left',
    username: '',
  },
  form3: {
    username: '',
    password: '',
  },
});

const form = ref();

const onSubmit = (value: any) => {
  console.log(value);
};

const onSubmit2 = () => {
  form.value
    .validate()
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
</script>

<style lang="less">
.demo-form {
  background: #fff;

  .c-form {
    max-width: 600px;
    padding: 0 16px;
  }
}
</style>
