## 功能介绍：

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

git clone https://codes.ai-xuexi.cn/open-code/web-admin.git

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

默认账号  ec   密码  123456
增加菜单：需要在 系统设置 -> 菜单管理 -> 参照已有的菜单增加相应的菜单，配置好路由，再到角色管理中对应的用户所属的角色中选择相应的菜单权限，再退出登陆，重新登陆后即可看到新增加的菜单，后续只需要按菜单配置中的页面路径增加相应的页面即可。
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



# 友情链接 & 特别鸣谢

- MyBatis-Plus：[https://mybatis.plus/](https://mybatis.plus/)
- knife4j：[http://doc.xiaominfo.com/](http://doc.xiaominfo.com/)
- hutool：[https://hutool.cn/](https://hutool.cn/)
- xxl-job：[http://www.xuxueli.com/xxl-job/](http://www.xuxueli.com/xxl-job/)
- kkfileview：[https://kkfileview.keking.cn](https://kkfileview.keking.cn)
- vue-vben-admin： [https://github.com/anncwb/vue-vben-admin](https://github.com/anncwb/vue-vben-admin) ec-web-plus 基于本项目改造
- FEBS Cloud Web： [https://gitee.com/mrbirdd/FEBS-Cloud-Web](https://gitee.com/mrbirdd/FEBS-Cloud-Web) ec-web 基于本项目改造， 感谢 [wuyouzhuguli](https://github.com/wuyouzhuguli)
- Cloud-Platform： [https://gitee.com/geek_qi/cloud-platform](https://gitee.com/geek_qi/cloud-platform) 作者学习时接触到的第一个微服务项目
