# ec 快速开发平台

[![Language](https://img.shields.io/badge/语言-Java%20%7C%20SpringCloud%20%7C%20Vue3%20%7C%20...-red?style=flat-square&color=42b883)](https://github.com/zuihou/ec-cloud) [![License](https://img.shields.io/github/license/zuihou/ec-cloud?color=42b883&style=flat-square)](https://github.com/zuihou/ec-cloud/blob/master/LICENSE) [![Author](https://img.shields.io/badge/作者-zuihou-orange.svg)](https://github.com/zuihou) [![Version](https://img.shields.io/badge/版本-3.5.3-brightgreen.svg)](https://github.com/zuihou/ec-cloud) [![Star](https://img.shields.io/github/stars/zuihou/ec-cloud?color=42b883&logo=github&style=flat-square)](https://github.com/zuihou/ec-cloud/stargazers) [![Fork](https://img.shields.io/github/forks/zuihou/ec-cloud?color=42b883&logo=github&style=flat-square)](https://github.com/zuihou/ec-cloud/network/members) [![Star](https://gitee.com/zuihou111/ec-cloud/badge/star.svg?theme=gray)](https://gitee.com/zuihou111/ec-cloud/stargazers) [![Fork](https://gitee.com/zuihou111/ec-cloud/badge/fork.svg?theme=gray)](https://gitee.com/zuihou111/ec-cloud/members)

## ec 会员版项目演示地址

- 地址： https://tangyh.top
- 以下内置账号仅限于内置的 0000 租户
- 平台管理员： ec_pt/ec (内置给公司内部运营人员使用)
- 超级管理员： ec/ec
- 普通管理员： general/ec
- 普通账号： normal/ec

> ps: 演示环境中内置租户没有写入权限，若要在演示环境测试增删改，请使用 ec_pt 账号查询租户管理员账号后,登录新租户测试

## ec-cloud/ec-boot + ec-web-plus 功能介绍：

1. 租户管理：运营人员管理所有的租户创建
2. 工作台：普通用户常用功能
3. 组织管理：组织、岗位、用户数据维护、重置用户密码等
4. 资源中心：消息、短信、附件管理
5. 流程管理：流程部署、模型管理、流程示例
6. 系统设置：菜单、资源配置、角色管理、给角色绑定用户、给角色授权菜单和资源、字典、地区、系统参数、操作日志、登录日志、应用管理等
7. 网关设置：限流和阻止访问
8. 开发者管理：定时任务、接口文档、注册&配置中心、服务监控、数据库监控、zipkin 监控、SkyWalking 监控

## 技术栈

- Vue 3.x
- vuex 4.x
- typescript 4.x
- ant-design-vue 2.x
- axios 0.21.x
- echarts 5.x
- vite 2.x

## 安装

### 环境要求

- `Node.js`: - 版本大于 `12.0.0`
- `yarn` : - 包管理工具.

### 下载

```
//  使git对文件名大小写敏感
git config core.ignorecase false

// 拉取项目代码

git clone https://github.com/zuihou/ec-web-plus.git

cd ec-web-plus

pnpm install --registry=https://registry.npmmirror.com
```

### pnpm 构建

从 3.5.4 开始，包管理器改成 pnpm

```
# 1. 删除`node_modules`和`yarn.lock`，全局安装`pnpm` (npm install -g pnpm)
# 2. 安装依赖: pnpm install           # 根据 package.json 的配置，下载依赖到node_modules文件中
# 3. 运行: pnpm serve                # 本地运行(读取.env.development + .env)
# 4. 构建生产环境包: pnpm build:prod   # 打包(读取.env.production + .env)
# 5. 构建测试环境包: pnpm build:boot   # 打包(读取.env.boot + .env)
```

## 使用

### 开发环境

```bash
pnpm serve
```

### 打包

```bash

pnpm build:prod # 打包(读取.env.production + .env)
pnpm build:boot # 打包(读取.env.boot + .env)

pnpm build:no-cache # 打包，执行之前会先删除缓存

pnpm report # 生成构建包报表预览
```

### 格式化

```bash
pnpm lint:stylelint # 样式格式化

pnpm lint:prettier # js/ts代码格式化
```

### 其他

```bash
pnpm reinstall # 删除依赖重新装，兼容window

pnpm preview # 本地进行打包预览

pnpm log # 生成CHANGELOG

pnpm clean:cache # 删除缓存

pnpm clean:lib # 删除node_modules，兼容window系统
```

# 交流群，加群前请先给项目点个 "Star"，谢谢！😘

- 63202894(主群 满员请加群 2)
- 1011148503(群 2)

# 如果觉得本项目对您有任何一点帮助，请点右上角 "Star" 支持一下， 并向您的基友、同事们宣传一下吧，谢谢！

# 详细文档: https://www.kancloud.cn/zuihou/zuihou-admin-cloud

    ps: gitee捐献 或者 二维码打赏(本页最下方)： 45元及以上 并 备注邮箱，可得"离线开发文档"一份，支持后续文档更新
        打赏或者捐献后直接加群：1039545140 并备注打赏时填写的邮箱，本群仅用于持续的获取最新的"离线开发文档"。
        "离线开发文档"和看云上的"在线文档"内容一样，在看云在线购买的不用申请入群，看云购买的可以申请上面的交流群。

# 遇到问题请先查看历史 issue，未找到解决方案，在提交 issue(问题描述详细一些，报错截图大一些，复现步骤全一些)

    https://github.com/zuihou/ec-cloud/issues

# 友情链接 & 特别鸣谢

- 微服务快速开发平台：[https://github.com/zuihou/ec-cloud](https://github.com/zuihou/ec-cloud)
- 单体快速开发平台：[https://github.com/zuihou/ec-boot](https://github.com/zuihou/ec-boot)
- MyBatis-Plus：[https://mybatis.plus/](https://mybatis.plus/)
- knife4j：[http://doc.xiaominfo.com/](http://doc.xiaominfo.com/)
- hutool：[https://hutool.cn/](https://hutool.cn/)
- xxl-job：[http://www.xuxueli.com/xxl-job/](http://www.xuxueli.com/xxl-job/)
- kkfileview：[https://kkfileview.keking.cn](https://kkfileview.keking.cn)
- vue-vben-admin： [https://github.com/anncwb/vue-vben-admin](https://github.com/anncwb/vue-vben-admin) ec-web-plus 基于本项目改造
- FEBS Cloud Web： [https://gitee.com/mrbirdd/FEBS-Cloud-Web](https://gitee.com/mrbirdd/FEBS-Cloud-Web) ec-web 基于本项目改造， 感谢 [wuyouzhuguli](https://github.com/wuyouzhuguli)
- Cloud-Platform： [https://gitee.com/geek_qi/cloud-platform](https://gitee.com/geek_qi/cloud-platform) 作者学习时接触到的第一个微服务项目
