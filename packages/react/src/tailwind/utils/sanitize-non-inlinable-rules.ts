import { type CssNode, string, walk } from 'css-tree';
import { sanitizeClassName } from './sanitize-class-name';
import { isRuleInlinable } from './is-rule-inlinable';

/**
 * Ensures the best email client support for non-inlinable rules:
 * 1. Converts all declarations in non-inlinable rules into !important
 * 2. Sanitizes class selectors of all non-inlinable rules
 */
export function sanitizeNonInlinableRules(node: CssNode) {
  walk(node, {
    visit: 'Rule',
    enter(rule) {
      if (!isRuleInlinable(rule)) {
        walk(rule.prelude, (node) => {
          if (node.type === 'ClassSelector') {
            const unescapedClassName = string.decode(node.name);
            node.name = sanitizeClassName(unescapedClassName);
          }
        });

        walk(rule, {
          visit: 'Declaration',
          enter(declaration) {
            declaration.important = true;
          },
        });
      }
    },
  });
}
