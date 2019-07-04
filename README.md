### babel-plugin-optional-chaining加强版，自动添加optional chaining并transform

> 优雅取值的终极方案：再也不用使用一堆的&&，使用lodash.get, 使用不兼容的Proxy, 随意链式取值，所有的前缀判断都在编译时自动添加


#### 如何使用

1.安装

```js
npm i -D babel-plugin-optional-chaining-enchance
```

2.babelrc or babel.config.json配置

因为本插件集成了babel-plugin-optional-chaining, 所以请务必不要再添加babel-plugin-optional-chaining
```js
{
  "plugins": [
     'babel-plugin-optional-chaining-enchance'
    ]
}
```

3.尽情享受链式取值的快感

#### 目前支持
 * y = a.b.c.d.e.f; => y = a?.b?.c?.d?.e?.f;
 * const x = a.b.c.d.e; => var x = a?.b?.c?.d?.e;
 * fn(a.b.c.d.e); => fn(a?.b?.c?.d?.e);
 * z.a.b.c(); => z?.a?.b?.c();
 * z.a.b.c[1]; => z?.a?.b?.c?.[1];
 * x['123'].vc.s; => x?.['123']?.vc?.s;
 * if (x.a.b) {} => if (x?.a?.b) {};

#### 目前不支持
 * 不支持new Test() => new Test?.();
 * 不支持x.a.c = 2左侧声明式转换
 * 不支持x() => x?.() // 函数调用会有比较多的问题，请自己添加?.使用， 比如x?.()

#### 相关链接
- https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
- https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md