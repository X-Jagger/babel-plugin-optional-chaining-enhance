### 这是一个 babel 插件，自动添加 optional chaining

> 优雅取值的终极方案：再也不用使用一堆的&&，使用lodash.get, 使用不兼容的Proxy, 随意链式取值，所有的前缀判断都在编译时自动添加


#### 如何使用

1.安装

```js
npm i -D @ks/babel-plugin-optional-chaining-helper @babel/plugin-proposal-optional-chaining
```

2.babelrc or babel.config.json配置

```js
{
  "plugins": [
      "@ks/babel-plugin-optional-chaining-helper",// 放@babel/plugin-proposal-optional-chaining之前
      "@babel/plugin-proposal-optional-chaining"
    ]
}
```

3.尽情享受链式取值的快感

#### 目前支持
暂时只支持对象属性的访问:
a.b.c => a?.b?.c

暂时不支持函数，class等调用，后续会有相应的计划

#### 相关链接
https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining