/**
 * @author X-Jagger
 * @email xl.jagger@gmail.com
 * @create date 2019-07-04 20:34:51
 * @modify date 2019-07-04 20:34:51
 * @desc Add '?.'(optional chaining) automatically to codes and transform them with babel-plugin-optional-chaining
 * Throw away lodash.get, not xx && xx. and son on, be free to enjoy writting clean codes.
 * Example: x.a[1].f(); => x?.a?.[1]?.f(); => (_x = x) === null || _x === void 0 ? void 0 : (_x$a = _x.a) === null || _x$a === void 0 ? void 0 : (_x$a$ = _x$a[1]) === null || _x$a$ === void 0 ? void 0 : _x$a$.f();
 */

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;

function _helperPluginUtils() {
    const data = require("@babel/helper-plugin-utils");

    _helperPluginUtils = function() {
        return data;
    };

    return data;
}

function _pluginSyntaxOptionalChaining() {
    const data = _interopRequireDefault(
        require("@babel/plugin-syntax-optional-chaining")
    );

    _pluginSyntaxOptionalChaining = function() {
        return data;
    };

    return data;
}

function _core() {
    const data = require("@babel/core");

    _core = function() {
        return data;
    };

    return data;
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

const _default = (0, _helperPluginUtils().declare)((api, options) => {
    api.assertVersion(7);
    const { loose = false } = options;
    const isValidPath = path => {
        if (
            (path.node.callee && path.node.callee.type === "Import") || // exclude import(xxx)
            (path.node.extra && path.node.extra.hasBeenTransfromedByBPOC)
        ) {
            return false;
        }
        return true;
    };
    const isInWhile = path => {
        const leftParentPath = path.find(path => path.key === "left");
        return (
            isValidPath(path) &&
            ((path.isMemberExpression() &&
                !(
                    leftParentPath &&
                    leftParentPath.parent.type === "AssignmentExpression"
                )) ||
                path.isCallExpression())
        );
    };
    return {
        name: "proposal-optional-chaining",
        inherits: _pluginSyntaxOptionalChaining().default,
        visitor: {
            "MemberExpression|CallExpression"(path) {
                let optionalPath = path;
                while (isInWhile(optionalPath)) {
                    if (optionalPath.isMemberExpression()) {
                        optionalPath.replaceWith(
                            _core().types.OptionalMemberExpression(
                                optionalPath.node.object,
                                optionalPath.node.property,
                                optionalPath.node.computed,
                                true
                            )
                        );
                        optionalPath = optionalPath.get("object");
                    } else if (optionalPath.isCallExpression()) {
                        optionalPath.replaceWith(
                            _core().types.OptionalCallExpression(
                                optionalPath.node.callee,
                                optionalPath.node.arguments,
                                false
                            )
                        );
                        optionalPath = optionalPath.get("callee");
                    }
                }
            },
            "OptionalCallExpression|OptionalMemberExpression"(path) {
                const { parentPath, scope } = path;
                const optionals = [];
                let optionalPath = path;

                while (
                    optionalPath.isOptionalMemberExpression() ||
                    optionalPath.isOptionalCallExpression()
                ) {
                    const { node } = optionalPath;

                    if (node.optional) {
                        optionals.push(node);
                    }

                    if (optionalPath.isOptionalMemberExpression()) {
                        optionalPath.node.type = "MemberExpression";
                        optionalPath = optionalPath.get("object");
                    } else if (optionalPath.isOptionalCallExpression()) {
                        optionalPath.node.type = "CallExpression";
                        optionalPath = optionalPath.get("callee");
                    }
                }

                let replacementPath = path;

                if (parentPath.isUnaryExpression({ operator: "delete" })) {
                    replacementPath = parentPath;
                }
                for (let i = optionals.length - 1; i >= 0; i--) {
                    const node = optionals[i];
                    node.extra = Object.assign(node.extra || {}, {
                        hasBeenTransfromedByBPOC: true
                    });
                    const isCall = _core().types.isCallExpression(node);

                    const replaceKey = isCall ? "callee" : "object";
                    const chain = node[replaceKey];
                    let ref;
                    let check;

                    if (loose && isCall) {
                        check = ref = chain;
                    } else {
                        ref = scope.maybeGenerateMemoised(chain);

                        if (ref) {
                            check = _core().types.assignmentExpression(
                                "=",
                                _core().types.cloneNode(ref),
                                chain
                            );
                            node[replaceKey] = ref;
                        } else {
                            check = ref = chain;
                        }
                    }

                    if (isCall && _core().types.isMemberExpression(chain)) {
                        if (loose) {
                            node.callee = chain;
                        } else {
                            const { object } = chain;
                            let context = scope.maybeGenerateMemoised(object);

                            if (context) {
                                chain.object = _core().types.assignmentExpression(
                                    "=",
                                    context,
                                    object
                                );
                            } else {
                                context = object;
                            }
                            node.arguments.unshift(
                                _core().types.cloneNode(context)
                            );
                            node.callee = _core().types.memberExpression(
                                node.callee,
                                _core().types.identifier("call")
                            );
                            // avoid 'MemberExpression|CallExpression' visitor dealing with this new memberExpression;
                            node.callee.extra = Object.assign(
                                optionalPath.node.extra || {},
                                { hasBeenTransfromedByBPOC: true }
                            );
                        }
                    }

                    replacementPath.replaceWith(
                        _core().types.conditionalExpression(
                            loose
                                ? _core().types.binaryExpression(
                                      "==",
                                      _core().types.cloneNode(check),
                                      _core().types.nullLiteral()
                                  )
                                : _core().types.logicalExpression(
                                      "||",
                                      _core().types.binaryExpression(
                                          "===",
                                          _core().types.cloneNode(check),
                                          _core().types.nullLiteral()
                                      ),
                                      _core().types.binaryExpression(
                                          "===",
                                          _core().types.cloneNode(ref),
                                          scope.buildUndefinedNode()
                                      )
                                  ),
                            scope.buildUndefinedNode(),
                            replacementPath.node
                        )
                    );
                    replacementPath = replacementPath.get("alternate");
                }
            }
        }
    };
});

exports.default = _default;
