var _foo, _foo2, _foo3, _foo4, _foo5;

foo(foo);
(_foo = foo) == null ? void 0 : _foo.bar();
(_foo2 = foo) == null ? void 0 : _foo2.bar((_foo3 = foo) == null ? void 0 : _foo3.bar, false);
(_foo4 = foo) == null ? void 0 : _foo4.bar((_foo5 = foo) == null ? void 0 : _foo5.bar, true);