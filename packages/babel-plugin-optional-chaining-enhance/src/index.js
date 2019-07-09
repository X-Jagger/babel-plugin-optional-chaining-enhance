/**
 * @author X-Jagger
 * @email xl.jagger@gmail.com
 * @github https://github.com/X-Jagger/babel-plugin-optional-chaining-enhance
 * @create date 2019-07-04 20:34:51
 * @modify date 2019-07-04 20:34:51
 * @desc Add '?.'(optional chaining) automatically to codes and transform them with babel-plugin-optional-chaining
 * Throw away lodash.get,xx && xx.yy and so on, enjoy writting clean codes.
 * Example: x.a[1].f(); => x?.a?.[1]?.f(); => (_x = x) === null || _x === void 0 ? void 0 : (_x$a = _x.a) === null || _x$a === void 0 ? void 0 : (_x$a$ = _x$a[1]) === null || _x$a$ === void 0 ? void 0 : _x$a$.f();
 */
import { declare } from "@babel/helper-plugin-utils";
import syntaxOptionalChaining from "@babel/plugin-syntax-optional-chaining";
import { types as t } from "@babel/core";
export default declare((api, options) => {
  api.assertVersion(7);
  const {
    loose = false
  } = options;

  const isValidPath = path => {
    if (path.node.callee && path.node.callee.type === "Import" || // exclude import(xxx)
    path.node.extra && path.node.extra.hasBeenTransfromedByBPOC) {
      return false;
    }

    return true;
  };

  const isInWhile = path => {
    const leftParentPath = path.find(path => path.key === "left");
    return isValidPath(path) && (path.isMemberExpression() && !(leftParentPath && leftParentPath.parent.type === "AssignmentExpression") || path.isCallExpression());
  };

  return {
    name: "proposal-optional-chaining",
    inherits: syntaxOptionalChaining,
    visitor: {
      "MemberExpression|CallExpression"(path) {
        let optionalPath = path;

        while (isInWhile(optionalPath)) {
          if (optionalPath.isMemberExpression()) {
            optionalPath.replaceWith(t.OptionalMemberExpression(optionalPath.node.object, optionalPath.node.property, optionalPath.node.computed, true));
            optionalPath = optionalPath.get("object");
          } else if (optionalPath.isCallExpression()) {
            optionalPath.replaceWith(t.OptionalCallExpression(optionalPath.node.callee, optionalPath.node.arguments, false));
            optionalPath = optionalPath.get("callee");
          }
        }
      },

      "OptionalCallExpression|OptionalMemberExpression"(path) {
        const {
          parentPath,
          scope
        } = path;
        const optionals = [];
        let optionalPath = path;

        while (optionalPath.isOptionalMemberExpression() || optionalPath.isOptionalCallExpression()) {
          const {
            node
          } = optionalPath;

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

        if (parentPath.isUnaryExpression({
          operator: "delete"
        })) {
          replacementPath = parentPath;
        }

        for (let i = optionals.length - 1; i >= 0; i--) {
          const node = optionals[i];
          node.extra = Object.assign(node.extra || {}, {
            hasBeenTransfromedByBPOC: true
          });
          const isCall = t.isCallExpression(node);
          const replaceKey = isCall ? "callee" : "object";
          const chain = node[replaceKey];
          let ref;
          let check;

          if (loose && isCall) {
            // If we are using a loose transform (avoiding a Function#call) and we are at the call,
            // we can avoid a needless memoize.
            check = ref = chain;
          } else {
            ref = scope.maybeGenerateMemoised(chain);

            if (ref) {
              check = t.assignmentExpression("=", t.cloneNode(ref), // Here `chain` MUST NOT be cloned because it could be updated
              // when generating the memoised context of a call espression
              chain);
              node[replaceKey] = ref;
            } else {
              check = ref = chain;
            }
          } // Ensure call expressions have the proper `this`
          // `foo.bar()` has context `foo`.


          if (isCall && t.isMemberExpression(chain)) {
            if (loose) {
              // To avoid a Function#call, we can instead re-grab the property from the context object.
              // `a.?b.?()` translates roughly to `_a.b != null && _a.b()`
              node.callee = chain;
            } else {
              // Otherwise, we need to memoize the context object, and change the call into a Function#call.
              // `a.?b.?()` translates roughly to `(_b = _a.b) != null && _b.call(_a)`
              const {
                object
              } = chain;
              let context = scope.maybeGenerateMemoised(object);

              if (context) {
                chain.object = t.assignmentExpression("=", context, object);
              } else {
                context = object;
              }

              node.arguments.unshift(t.cloneNode(context));
              node.callee = t.memberExpression(node.callee, t.identifier("call")); // avoid 'MemberExpression|CallExpression' visitor dealing with this new memberExpression;

              // avoid 'MemberExpression|CallExpression' visitor dealing with this new memberExpression;
              node.callee.extra = Object.assign(optionalPath.node.extra || {}, {
                hasBeenTransfromedByBPOC: true
              });
            }
          }

          replacementPath.replaceWith(t.conditionalExpression(loose ? t.binaryExpression("==", t.cloneNode(check), t.nullLiteral()) : t.logicalExpression("||", t.binaryExpression("===", t.cloneNode(check), t.nullLiteral()), t.binaryExpression("===", t.cloneNode(ref), scope.buildUndefinedNode())), scope.buildUndefinedNode(), replacementPath.node));
          replacementPath = replacementPath.get("alternate");
        }
      }

    }
  };
});