### web 项目介绍
- 项目详细文档可以查看[Vue vben admin - README](http://note.youdao.com/noteshare?id=ac261228a2d1dbd11ae0b0f8b5ead7f9&sub=5981990498C24EF7BBAD97410AE05682) 或项目中 `README.zh-CN.md` 文档

## 简介

主要展示项目结构、主要用到的技术栈、问题描述、部分代码示例。


### 文档地址
- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法
- [框架文档地址](https://vvbin.cn/doc-next/) - 框架二次封装组件文档地址
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui 基本使用


### 友情提示

 > - 遇到组件使用疑问时，可以查看框架[demo站点](https://vvbin.cn/next/)，站点内包含组件示例以及使用，对应组件`demo`可以在项目中 `\src\views\demo`，目录下找到对应代码进行查看。
 > - 开发过程中如未找到对应组件使用或框架组件无法支持以及不想使用框架组件，可以使用[Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) 组件或自定义组件搭配使用（具体使用方法可以参考[示例1](#示例1)）。

### 目录结构说明

```javascript
├── .husky                     // git hook相关
├── dist                       // 打包后目录
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directives             // 全局指令
│   ├── enums                  // 项目所有枚举
│   ├── hooks                  // hook相关
│   ├── router                 // 路由相关
│   ├── store                  // 全局 store管理
│   ├── locales                // 多语言
│   ├── utils                  // 全局公用方法
│   ├── views                  // view
│        ├── demo                 // 项目组件demo（在此可以看到项目中使用到的组件示例代码）
│        ├── ec                   // 项目主要页面代码
│   ├── App.vue                // 入口页面
│   ├── main.ts                // 入口 加载组件 初始化等）
└── .eslintignore              // eslint 忽略项
└── .eslintrc.js               // eslint 配置
└── .gitignore                 // git 忽略项
└── .prettierrc                // pretty 配置
└──  index.html                // 打包时主入口文件
└──  package.json              // package.json
└──  vite.config.js            // vite 配置

```

### 示例1
> - 本示例为插槽使用示例，可以使用自定义组件或 ant-design-vue 组件
> - 使用过程：
> > - 以表单插槽举例
> > - 需要修改对应 `xxx.data.ts` 文件中需要使用插槽的项添加 `slot` 字段
> > - 然后再 对应的 `xxx.vue` 文件中 添加 `template` 标签，使用[具名插槽](https://v3.cn.vuejs.org/guide/component-slots.html#%E5%85%B7%E5%90%8D%E6%8F%92%E6%A7%BD)，
> > - 具体可以查看下方代码示例
> > - tips: 对应文件都会在同一个文件夹中，

```javascript
//  xxx.data.ts 
export const editFormSchema = [
	{
    title: '',
    dataIndex: '',
		// 这里定义 vue 文件中对应组件名称
    slot: 'areaIdList_2d',
	}
]
// xxx.vue
<template>
	<BasicForm>
		<template #areaIdList_2d="{}">
		    // 这里可以使用 ant-design-vue 组件 或 自定义内容
		    // 内容开始
			<Cascader
				v-model:value="formState.areaIdList_2d"
				multiple
				:options="areaOptions"
				placeholder="请选择"
				@change="handleAreaChange"
			/>
			// 内容结束
		</template>
	</BasicForm>
</template>
<script  lang="ts">
  import { defineComponent } from 'vue';
  // 按需引入对应组件
  import { Cascader } from 'ant-design-vue';
   export default defineComponent({
        name: 'XXX',
        components: { Cascader },
   })
  
</script>
```