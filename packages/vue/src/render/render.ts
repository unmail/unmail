import type { Component } from 'vue';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { convert } from 'html-to-text';
import type { RenderOptions } from './options';
import { plainTextSelectors } from './plain-text-selectors';
import { pretty } from './pretty';
import { cleanup } from './cleanup';

const doctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

export async function render(
  component: Component,
  props?: Record<string, unknown>,
  options?: RenderOptions,
): Promise<string> {
  const app = createSSRApp({
    render: () => h(component, props),
  });

  const markup = await renderToString(app);

  if (options?.plainText) {
    return convert(markup, {
      selectors: plainTextSelectors,
      ...(options.plainText === true
        ? (options as { htmlToTextOptions?: Record<string, unknown> })
            .htmlToTextOptions
        : {}),
    });
  }

  const html = `${doctype}${cleanup(markup)}`;

  if (options?.pretty) {
    return pretty(html);
  }

  return html;
}
