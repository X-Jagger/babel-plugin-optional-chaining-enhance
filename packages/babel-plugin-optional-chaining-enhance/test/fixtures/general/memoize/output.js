"use strict";

function test(foo) {
  var _foo$bar, _foo$bar2, _foo$bar3, _foo$bar4, _foo$bar5;

  foo === null || foo === void 0 ? void 0 : foo.bar;
  foo === null || foo === void 0 ? void 0 : (_foo$bar = foo.bar) === null || _foo$bar === void 0 ? void 0 : _foo$bar.baz;
  foo(foo);
  foo === null || foo === void 0 ? void 0 : foo.bar();
  foo === null || foo === void 0 ? void 0 : foo.bar(foo === null || foo === void 0 ? void 0 : foo.bar, false);
  foo === null || foo === void 0 ? void 0 : foo.bar(foo === null || foo === void 0 ? void 0 : foo.bar, true);
  foo === null || foo === void 0 ? void 0 : (_foo$bar2 = foo.bar) === null || _foo$bar2 === void 0 ? void 0 : _foo$bar2.baz(foo === null || foo === void 0 ? void 0 : foo.bar, false);
  foo === null || foo === void 0 ? void 0 : (_foo$bar3 = foo.bar) === null || _foo$bar3 === void 0 ? void 0 : _foo$bar3.baz(foo === null || foo === void 0 ? void 0 : foo.bar, true);
  foo === null || foo === void 0 ? void 0 : (_foo$bar4 = foo.bar) === null || _foo$bar4 === void 0 ? void 0 : _foo$bar4.baz(foo === null || foo === void 0 ? void 0 : foo.bar, false);
  foo === null || foo === void 0 ? void 0 : (_foo$bar5 = foo.bar) === null || _foo$bar5 === void 0 ? void 0 : _foo$bar5.baz(foo === null || foo === void 0 ? void 0 : foo.bar, true);
}