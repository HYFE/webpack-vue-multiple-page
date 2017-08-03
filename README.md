# webpack-vue-multiple-page
Webpack, Vue 开发多页面项目环境。

## 变更

### mock 不在拼接文件名到请求路径中

如请求：`/api/project/list`，编辑 `mock/project.js`：

原来：

```js
module.exports = [{
    url: '/list',
    data: [{
        id: '@id',
        name: '@cname',
    }, {
        id: '@id',
        name: '@cname',
    }, {
        id: '@id',
        name: '@cname',
    }]
}]
```

现在：

```js
module.exports = [{
    url: '/project/list',
    data: [{
        id: '@id',
        name: '@cname',
    }, {
        id: '@id',
        name: '@cname',
    }, {
        id: '@id',
        name: '@cname',
    }]
}]
```

> 原来的做法会因为某个模块业务逻辑庞大，导致该模块对应的文件内 mock 配置过多，不利于查看和多人修改时经常文件冲突。

### 移除 Ajax 工具类

原来：

```js
// 原来
import Ajax from 'core/ajax'

const myApi = new Ajax(yourPath)

export default myApi
```

现在：

```js
import { PATH, GET } from 'core/ajax'

const getList = () => GET('/project/list')
const getOne = id => GET(`/project/${id}`)
// 也可以这样，方便 path 复用，返回 projectRes.get/post/delete/put/request
const projectRes = id => PATH('/project/:id', id)

export default {
    getList,
    getOne,
    projectRes
}
```

> 按需使用不同的工具函数，减少类冗余。

## 入口

原来单页应用开发时，以 `src/main.js` 为入口文件，现在都放到 `src/pages` 目录，按页面名建立文件夹。

```bash
🗁 pages
  |--🗁 one
  |  |--🗎 index.hbs    # 模版
  |  `--🗎 index.js     # 入口文件
  `--🗎 index.hbs       # 由于没有 index 页面，所以添加一个模版生成导航页。
```

> 开发服务启动时会自动扫描该目录，生成导航页面和每个页面的 webpack entry 配置。

## 插件

对于 Vue 插件，有 `mixins`、`filters`、`components`、`directives` 等，有些是需要全局注册的，有些是按需引用的。

现规划如下：

1. 每个插件模块只输出插件自身，不作注册
2. 需要全局引用的插件，在 `components/index.js`、`mixins/index.js`、`plugins/index.js` 中注册
3. 按需引用的插件在需要的组件中引用

如添加一个指令：

```js
// plugins/hello.js
const fn = () => console.log('hello')

export default {
    name: 'hello',
    bind(el) {
        el.addEventListener('click', fn)
    },
    unbind(el) {
        el.removeEventListener('click', fn)
    }
}
```

如果要注册到全局，就在 `plugins/index.js` 中注册：

```js
import hello from './hello'

export default {
    install(Vue) {
        Vue.directive(hello.name, hello)
    }
}
```

否则在需要的组件内引用：

```js
import hello from 'plugins/hello'

export default {
    directives: {
        hello
    },
    // ...
}
```

> 全局资源都会在 `src/common.js` 中引用，最终打包为一个公共的 `bundle`。
