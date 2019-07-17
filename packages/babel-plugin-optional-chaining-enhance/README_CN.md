<h1 align="center">Babel-plugin-optional-chaining-enhance</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/X-Jagger/babel-plugin-optional-chaining-enhance#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/X-Jagger/babel-plugin-optional-chaining-enhance/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/X-Jagger/babel-plugin-optional-chaining-enhance/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> 优雅取值的终极方案：再也不用使用一堆的&&，使用lodash.get, 使用不兼容的Proxy, 随意链式取值，所有的前缀判断都在编译时自动添加

## ✨ Example
> x.a => x?.a => var _x; (_x = x) === null || _x === void 0 ? void 0 : _x.a;

#### 目前支持
 * y = a.b.c.d.e.f => y = a?.b?.c?.d?.e?.f => transform by @babel/babel-plugin-optional-chaining
 * const x = a.b.c.d.e => var x = a?.b?.c?.d?.e => transform~
 * fn(a.b.c.d.e) => fn(a?.b?.c?.d?.e) => transform~
 * z.a.b.c() => z?.a?.b?.c() => transform~
 * z.a.b.c[1] => z?.a?.b?.c?.[1] => transform~
 * x['123'].vc.s => x?.['123']?.vc?.s => transform~
 * if (x.a.b) {} => if (x?.a?.b) {} => transform~

#### 目前不支持
 * 不支持new Test() !=> new Test?.();
 * 不支持x.a.c = 2 !=> (x?.a).c = 2 左侧声明式转换
 * 不支持x() !=> x?.() // 函数调用会有比较多的问题，请自己添加?.使用， 比如x?.()


## Install

```sh
npm install -D babel-plugin-optional-chaining-enhance
```
## 🚀 Usage

- 因为本插件集成了babel-plugin-optional-chaining, 所以请务必不要再添加babel-plugin-optional-chaining
- 把这个插件放到最后
1 .babelrc/babel.config.js
```js
{
  "plugins": [
     'babel-plugin-optional-chaining-enchance' // 把这个插件放到其他插件后面
    ]
}
```
## Options

```js
{
  "plugins": [
     ['babel-plugin-optional-chaining-enchance', {loose: false, auto: ture}]
    ]
}
```
### auto

布尔值，默认为true

如果为true，此转换将自动添加“？”。对所有相关代码进行转换。

如果为false，这个插件其实是@babel/plugin-proposal-optional-chaining，只转换"?."的代码

### loose
布尔值，默认为false。

如果为true，则此转换将假装document.all不存在，并使用null执行松散的相等性检查，而不是对null和undefined进行严格的相等性检查。

Example In

```js
foo?.bar;
```

Out (loose === true)

```js
foo == null ? void 0 : foo.bar;
```

Out (loose === false)
```js
foo === null || foo === void 0 ? void 0 : foo.bar;
```

## TODO
* [x] 完成基本功能
* [x] 添加测试
* [x] Add travis, circleci
* [x] Add coverage test

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [X-Jagger](https://github.com/X-Jagger).<br />
This project is [MIT](https://github.com/X-Jagger/babel-plugin-optional-chaining-enhance/blob/master/LICENSE) licensed.

#### 相关链接
- https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
- https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_