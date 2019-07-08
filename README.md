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

> Automatically add &#39;?.&#39;(optional chaining) to codes and transform them with @babel/babel-plugin-optional-chaining

* [中文版](./README_CN.md)

## ✨ Example

You just need to write the codes, and `babel-plugin-optional-chaining-plugin` will do all for you.
> x.a => x?.a => var _x;(_x = x) === null || _x === void 0 ? void 0 : _x.a;

#### Support
 * y = a.b.c.d.e.f => y = a?.b?.c?.d?.e?.f => transform by @babel/babel-plugin-optional-chaining
 * const x = a.b.c.d.e => var x = a?.b?.c?.d?.e => transform~
 * fn(a.b.c.d.e) => fn(a?.b?.c?.d?.e) => transform~
 * z.a.b.c() => z?.a?.b?.c() => transform~
 * z.a.b.c[1] => z?.a?.b?.c?.[1] => transform~
 * x['123'].vc.s => x?.['123']?.vc?.s => transform~
 * if (x.a.b) {} => if (x?.a?.b) {} => transform~

#### Not support
 * new Test() !=> new Test?.()
 * x.a.c = 2 !=> (x?.a).c = 2
 * x() !=> x?.() // manually using x?.() is Ok


## Install

```sh
npm install -D babel-plugin-optional-chaining-enhance
```

## 🚀 Usage

Because this plugin has already integrated @babel/babel-plugin-optional-chaining, please don't use @babel/babel-plugin-optional-chaining anymore.

1 .babelrc/babel.config.js
```js
{
  "plugins": [
     'babel-plugin-optional-chaining-enchance'
    ]
}
```
2 Enjoy writing clean codes

## TODO
* [x] complete basic functionality
* [x] Add test
* [x] Add travis

## Author

👤 **X-Jagger**

* Github: [@X-Jagger](https://github.com/X-Jagger)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [X-Jagger](https://github.com/X-Jagger).<br />
This project is [MIT](https://github.com/X-Jagger/babel-plugin-optional-chaining-enhance/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_