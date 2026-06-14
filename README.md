# 代购清单

一个轻量级移动端 H5 代购清单工具，支持多人实时数据同步。

## 功能特性

- 商品列表展示（图片、中文名、韩文名、代购地点、国内价格）
- 商品图片上传（自动压缩）
- 商品增删改查
- 勾选完成状态
- **多人多设备实时数据同步**（WebSocket + Pusher）
- 首次启动自动加载预置示例数据

## 技术栈

- Vue 3 + Vite 5
- TypeScript
- Pinia（状态管理）
- Vant 4（移动端 UI）
- Vue Router 4
- Pusher（实时同步）
- Vercel Serverless Functions（API）

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署到 Vercel（一键部署）

### 1. 创建 Pusher 账号

1. 访问 [Pusher](https://pusher.com/) 注册账号
2. 创建新应用，获取以下信息：
   - App ID
   - Key
   - Secret
   - Cluster

### 2. 配置环境变量

在 Vercel 项目设置中添加环境变量：

| 变量名 | 值 |
|--------|-----|
| `PUSHER_APP_ID` | 你的 Pusher App ID |
| `PUSHER_KEY` | 你的 Pusher Key |
| `PUSHER_SECRET` | 你的 Pusher Secret |
| `PUSHER_CLUSTER` | 你的 Pusher Cluster（如 `ap1`） |

### 3. 部署

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com/) 导入仓库
3. 点击 Deploy！

### 手动部署

```bash
# 构建
npm run build

# 将 dist 目录部署到任何静态服务器
```

## 数据同步说明

本项目使用 **Pusher Channels** 实现多人实时数据同步：

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   浏览器A   │     │   浏览器B   │     │   手机浏览器 │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Pusher    │
                    │  (WebSocket)│
                    └──────▲──────┘
                           │
                    ┌──────┴──────┐
                    │  Vercel    │
                    │  Functions  │
                    │   (API)     │
                    └─────────────┘
```

## 目录结构

```
src/
├── main.ts              # 入口文件
├── App.vue              # 根组件
├── pages/
│   ├── HomePage.vue     # 清单首页
│   └── EditPage.vue     # 添加/编辑页
├── components/
│   ├── ProductCard.vue  # 商品卡片
│   ├── ImageUploader.vue# 图片上传
│   └── PriceInput.vue   # 价格输入
├── stores/
│   └── productStore.ts  # Pinia store
├── types/
│   └── product.ts       # Product 接口定义
├── utils/
│   ├── storage.ts       # localStorage 封装
│   ├── imageCompress.ts # 图片压缩
│   └── pusher.ts        # Pusher 配置
└── router/
    └── index.ts         # 路由配置

api/
└── products.ts          # Vercel Serverless API

vercel.json              # Vercel 配置
```