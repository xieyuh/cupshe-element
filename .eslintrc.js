module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'arrow-spacing': 'off',
    // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
    'no-unused-expressions': 0,
    // 禁止比较变量与自身
    'no-self-compare': 2,
    // 不能修改使用const关键字声明的变量
    'no-const-assign': 2,
    // 不允许空块语句
    // 'no-empty-pattern': 2,
    // 不允许使用eval
    'no-eval': 2,
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    // 任何对未声明的变量的引用都会导致错误
    // 'no-undef': 2,
    // 禁用var
    'no-var': 2,
    //代码过长是否换行
    // "max-len": 0,
    // 不使用分号
    semi: [2, 'never'],
    // 强制使用全等
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    //禁止比较时使用NaN，只能用isNaN()
    'use-isnan': 2,
    //必须使用合法的typeof的值
    'valid-typeof': 2,
    // 使用标准逗号样式，逗号位于当前行的末尾。在数组元素，对象属性或变量声明在同一行之后和同一行需要逗号
    // 'comma-style': [2, 'last'],
    // // 在对象或数组中不允许尾随逗号
    // 'comma-dangle': [2, 'never'],
    //缩进风格
    indent: [2, 2, { SwitchCase: 1 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
