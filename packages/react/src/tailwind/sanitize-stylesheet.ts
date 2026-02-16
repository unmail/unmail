import type { StyleSheet } from 'css-tree';
import { resolveAllCssVariables } from './utils/resolve-all-css-variables';
import { resolveCalcExpressions } from './utils/resolve-calc-expressions';
import { sanitizeDeclarations } from './utils/sanitize-declarations';

export function sanitizeStyleSheet(styleSheet: StyleSheet) {
  resolveAllCssVariables(styleSheet);
  resolveCalcExpressions(styleSheet);
  sanitizeDeclarations(styleSheet);
}
