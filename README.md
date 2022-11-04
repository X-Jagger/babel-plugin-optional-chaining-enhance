<h1 align="center">Babel-plugin-optional-chaining-enhance</h1>
<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.6-blue.svg?cacheSeconds=2592000" />
  <a href="https://travis-ci.org/X-Jagger/babel-plugin-optional-chaining-enhance"><img alt="Travis Status" src="https://img.shields.io/travis/X-Jagger/babel-plugin-optional-chaining-enhance/master.svg?label=travis&maxAge=43200"></a>
  <a href="https://circleci.com/gh/X-Jagger/babel-plugin-optional-chaining-enhance"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/github/X-Jagger/babel-plugin-optional-chaining-enhance/master.svg?label=circle&maxAge=43200"></a>
  <a href="https://codecov.io/gh/X-Jagger/babel-plugin-optional-chaining-enhance"><img alt="Coverage Status" src="https://img.shields.io/codecov/c/github/X-Jagger/babel-plugin-optional-chaining-enhance/master.svg?maxAge=43200"></a>
  <a href="https://github.com/X-Jagger/babel-plugin-optional-chaining-enhance/graphs/commit-activity">
  <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/X-Jagger/babel-plugin-optional-chaining-enhance/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> Automatically add &#39;?.&#39;(optional chaining) to codes and transform them with @babel/babel-plugin-optional-chaining

-   [中文版](./README_CN.md)

## ✨ Example

You just need to write the codes, and `babel-plugin-optional-chaining-plugin` will do all for you.

> x.a => x?.a => var \_x;(\_x = x) === null || \_x === void 0 ? void 0 : \_x.a;

#### Support

-   y = a.b.c.d.e.f => y = a?.b?.c?.d?.e?.f => transform by @babel/babel-plugin-optional-chaining
-   const x = a.b.c.d.e => var x = a?.b?.c?.d?.e => transform~
-   fn(a.b.c.d.e) => fn(a?.b?.c?.d?.e) => transform~
-   z.a.b.c() => z?.a?.b?.c() => transform~
-   z.a.b.c[1] => z?.a?.b?.c?.[1] => transform~
-   x['123'].vc.s => x?.['123']?.vc?.s => transform~
-   if (x.a.b) {} => if (x?.a?.b) {} => transform~

#### Not support

-   new Test() !=> new Test?.()
-   x.a.c = 2 !=> (x?.a).c = 2
-   x() !=> x?.() // manually using x?.() is Ok

## Install

```sh
npm install -D babel-plugin-optional-chaining-enhance
```

## 🚀 Usage

- Because this plugin has already integrated @babel/babel-plugin-optional-chaining, please don't use @babel/babel-plugin-optional-chaining anymore.
- Put it at the last position of all plugins

1 .babelrc/babel.config.js

```js
{
  "plugins": [
     'babel-plugin-optional-chaining-enhance' // put it at the last of all plugins
    ]
}
```

2 Enjoy writing clean codes

## Options

```js
{
  "plugins": [
     ['babel-plugin-optional-chaining-enhance', {loose: false, auto: ture}]
    ]
}
```
### auto
boolean, defaults to true

when true, this transform will automatically add '?.' to all the relevant codes and transform them.

when false, this plugin is @babel/plugin-proposal-optional-chaining, only transform the codes with '?.' before.

### loose
boolean, defaults to false.

When true, this transform will pretend document.all does not exist, and perform loose equality checks with null instead of strict equality checks against both null and undefined.

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

-   [x] complete basic functionality
-   [x] Add test
-   [x] Add travis, circleci
-   [x] Add coverage test

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [X-Jagger](https://github.com/X-Jagger).<br />
This project is [MIT](https://github.com/X-Jagger/babel-plugin-optional-chaining-enhance/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
