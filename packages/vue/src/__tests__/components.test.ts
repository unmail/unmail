import { describe, expect, it } from 'vitest';
import { createSSRApp, defineComponent, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import {
  Body,
  Button,
  CodeBlock,
  CodeInline,
  codeBlockThemes,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Markdown,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '../index';

/**
 * Helper: render a VNode tree to HTML string via Vue SSR.
 * This allows testing components with slot content (children).
 */
async function renderVNode(vnode: ReturnType<typeof h>): Promise<string> {
  const app = createSSRApp({
    render: () => vnode,
  });
  return await renderToString(app);
}

describe('render', () => {
  it('renders a component to HTML with doctype', async () => {
    const Wrapper = defineComponent({
      setup() {
        return () => h(Html, null, () => [h(Head)]);
      },
    });
    const html = await render(Wrapper);
    expect(html).toContain('<!DOCTYPE html');
    expect(html).toContain('<html');
    expect(html).toContain('<head');
  });

  it('renders plain text when option is set', async () => {
    const Wrapper = defineComponent({
      setup() {
        return () =>
          h(Html, null, () => [
            h(Body, null, () => [h(Text, null, () => ['Hello World'])]),
          ]);
      },
    });
    const text = await render(Wrapper, {}, { plainText: true });
    expect(text).toContain('Hello World');
    expect(text).not.toContain('<html');
  });
});

describe('<Html>', () => {
  it('renders with default lang and dir', async () => {
    const html = await renderVNode(h(Html));
    expect(html).toContain('lang="en"');
    expect(html).toContain('dir="ltr"');
  });

  it('renders with custom lang and dir', async () => {
    const html = await renderVNode(h(Html, { lang: 'ar', dir: 'rtl' }));
    expect(html).toContain('lang="ar"');
    expect(html).toContain('dir="rtl"');
  });
});

describe('<Head>', () => {
  it('renders meta tags', async () => {
    const html = await renderVNode(h(Html, null, () => [h(Head)]));
    expect(html).toContain('charset=UTF-8');
    expect(html).toContain('x-apple-disable-message-reformatting');
  });

  it('renders children', async () => {
    const html = await renderVNode(
      h(Html, null, () => [
        h(Head, null, () => [h('title', 'Test Email')]),
      ]),
    );
    expect(html).toContain('<title>Test Email</title>');
  });
});

describe('<Body>', () => {
  it('renders children inside table wrapper', async () => {
    const html = await renderVNode(h(Body, null, () => ['Test content']));
    expect(html).toContain('Test content');
    expect(html).toContain('<table');
    expect(html).toContain('role="presentation"');
    expect(html).toContain('<tbody>');
    expect(html).toContain('<td');
  });

  it('hoists background to body and zeroes margins', async () => {
    const html = await renderVNode(
      h(
        Body,
        { style: { backgroundColor: '#ffffff', margin: '10px' } },
        () => ['Content'],
      ),
    );
    // Body tag should have background-color
    expect(html).toMatch(/<body[^>]*background-color: ?#ffffff/);
    // Body margins should be zeroed
    expect(html).toMatch(/<body[^>]*margin: ?0/);
  });
});

describe('<Container>', () => {
  it('renders as centered table with max-width', async () => {
    const html = await renderVNode(h(Container, null, () => ['Content']));
    expect(html).toContain('Content');
    expect(html).toContain('max-width:');
    expect(html).toContain('37.5em');
    expect(html).toContain('role="presentation"');
    expect(html).toContain('align="center"');
  });

  it('passes custom styles', async () => {
    const html = await renderVNode(
      h(Container, { style: { backgroundColor: 'red' } }, () => ['Content']),
    );
    expect(html).toContain('background-color');
    expect(html).toContain('red');
  });
});

describe('<Section>', () => {
  it('renders as table with children in td', async () => {
    const html = await renderVNode(
      h(Section, null, () => ['Section content']),
    );
    expect(html).toContain('Section content');
    expect(html).toContain('<table');
    expect(html).toContain('<td>');
  });
});

describe('<Row>', () => {
  it('renders as table with children in tr', async () => {
    const html = await renderVNode(
      h(Row, null, () => [h(Column, null, () => ['Col 1'])]),
    );
    expect(html).toContain('Col 1');
    expect(html).toContain('<tr');
    expect(html).toContain('<td');
  });
});

describe('<Column>', () => {
  it('renders as td with children', async () => {
    const html = await renderVNode(h(Column, null, () => ['Column content']));
    expect(html).toContain('<td');
    expect(html).toContain('Column content');
  });

  it('passes style through', async () => {
    const html = await renderVNode(
      h(Column, { style: { width: '50%' } }, () => ['Content']),
    );
    expect(html).toContain('width:50%');
  });
});

describe('<Text>', () => {
  it('renders as p with default styles', async () => {
    const html = await renderVNode(h(Text, null, () => ['Hello']));
    expect(html).toContain('<p');
    expect(html).toContain('Hello');
    expect(html).toContain('font-size:');
    expect(html).toContain('14px');
    expect(html).toContain('line-height:');
    expect(html).toContain('24px');
  });

  it('applies default 16px margins', async () => {
    const html = await renderVNode(h(Text, null, () => ['Hello']));
    expect(html).toContain('margin-top');
    expect(html).toContain('16px');
    expect(html).toContain('margin-bottom');
  });

  it('allows overriding margins', async () => {
    const html = await renderVNode(
      h(Text, { style: { marginTop: '0px' } }, () => ['Hello']),
    );
    expect(html).toContain('margin-top:0px');
  });
});

describe('<Heading>', () => {
  it('renders as h1 by default', async () => {
    const html = await renderVNode(h(Heading, null, () => ['Title']));
    expect(html).toContain('<h1');
    expect(html).toContain('Title');
  });

  it('renders as custom heading level', async () => {
    const html = await renderVNode(h(Heading, { as: 'h3' }, () => ['Subtitle']));
    expect(html).toContain('<h3');
    expect(html).toContain('Subtitle');
  });

  it('applies margin props', async () => {
    const html = await renderVNode(
      h(Heading, { mt: 10, mb: 20 }, () => ['Title']),
    );
    expect(html).toContain('margin-top:10px');
    expect(html).toContain('margin-bottom:20px');
  });
});

describe('<Link>', () => {
  it('renders with default target and color', async () => {
    const html = await renderVNode(
      h(Link, { href: 'https://example.com' }, () => ['Click me']),
    );
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('color');
    expect(html).toContain('#067df7');
    expect(html).toContain('Click me');
  });

  it('allows custom target', async () => {
    const html = await renderVNode(
      h(Link, { href: '#', target: '_self' }, () => ['Link']),
    );
    expect(html).toContain('target="_self"');
  });
});

describe('<Img>', () => {
  it('renders with default styles', async () => {
    const html = await renderVNode(
      h(Img, {
        src: 'https://example.com/img.png',
        alt: 'Test image',
        width: 200,
        height: 100,
      }),
    );
    expect(html).toContain('src="https://example.com/img.png"');
    expect(html).toContain('alt="Test image"');
    expect(html).toContain('width="200"');
    expect(html).toContain('height="100"');
    expect(html).toContain('display:block');
    expect(html).toContain('border:none');
  });
});

describe('<Button>', () => {
  it('renders as anchor with default target', async () => {
    const html = await renderVNode(
      h(Button, { href: 'https://example.com' }, () => ['Click']),
    );
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Click');
  });

  it('renders MSO conditional comments for padding', async () => {
    const html = await renderVNode(
      h(
        Button,
        { href: '#', style: { padding: '10px 20px' } },
        () => ['Button'],
      ),
    );
    expect(html).toContain('<!--[if mso]>');
    expect(html).toContain('mso-font-width');
    expect(html).toContain('<![endif]-->');
  });

  it('renders with inline-block display', async () => {
    const html = await renderVNode(h(Button, { href: '#' }, () => ['Button']));
    expect(html).toContain('display:inline-block');
  });
});

describe('<Hr>', () => {
  it('renders with default styles', async () => {
    const html = await renderVNode(h(Hr));
    expect(html).toContain('<hr');
    expect(html).toContain('width:100%');
    expect(html).toContain('border:none');
    expect(html).toContain('border-top:1px solid #eaeaea');
  });

  it('allows style overrides', async () => {
    const html = await renderVNode(
      h(Hr, { style: { borderTop: '2px solid red' } }),
    );
    expect(html).toContain('border-top:2px solid red');
  });
});

describe('<Preview>', () => {
  it('renders hidden preview text', async () => {
    const html = await renderVNode(
      h(Preview, null, () => ['Preview text here']),
    );
    expect(html).toContain('Preview text here');
    expect(html).toContain('display:none');
    expect(html).toContain('max-height:0');
  });

  it('pads with whitespace characters', async () => {
    const html = await renderVNode(h(Preview, null, () => ['Short']));
    // Should contain zero-width characters for padding
    expect(html).toContain('\u200C');
  });
});

describe('<Font>', () => {
  it('renders @font-face style tag', async () => {
    const html = await renderVNode(
      h(Font, {
        fontFamily: 'Roboto',
        fallbackFontFamily: 'Arial',
        webFont: {
          url: 'https://fonts.example.com/roboto.woff2',
          format: 'woff2',
        },
      }),
    );
    expect(html).toContain("font-family: 'Roboto'");
    expect(html).toContain('src: url(https://fonts.example.com/roboto.woff2)');
    expect(html).toContain("format('woff2')");
    expect(html).toContain("mso-font-alt: 'Arial'");
  });

  it('renders with array of fallback fonts', async () => {
    const html = await renderVNode(
      h(Font, {
        fontFamily: 'CustomFont',
        fallbackFontFamily: ['Arial', 'Helvetica'],
      }),
    );
    expect(html).toContain('Arial, Helvetica');
    expect(html).toContain("mso-font-alt: 'Arial'");
  });
});

describe('<Markdown>', () => {
  it('renders markdown content', async () => {
    const html = await renderVNode(
      h(Markdown, { source: '# Hello\n\nThis is **bold** text.' }),
    );
    expect(html).toContain('<h1');
    expect(html).toContain('Hello');
    expect(html).toContain('<strong');
    expect(html).toContain('bold');
  });

  it('renders links with target blank', async () => {
    const html = await renderVNode(
      h(Markdown, { source: '[Click here](https://example.com)' }),
    );
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
  });
});

describe('full email render', () => {
  it('renders a complete email structure', async () => {
    const Wrapper = defineComponent({
      setup() {
        return () =>
          h(Html, null, () => [
            h(Head),
            h(Body, null, () => [
              h(Container, null, () => [
                h(Heading, null, () => ['Welcome']),
                h(Text, null, () => ['Hello World']),
                h(Button, { href: 'https://example.com' }, () => ['Click me']),
              ]),
            ]),
          ]);
      },
    });

    const html = await render(Wrapper);
    expect(html).toContain('<!DOCTYPE html');
    expect(html).toContain('<html');
    expect(html).toContain('<head');
    expect(html).toContain('<body');
    expect(html).toContain('Welcome');
    expect(html).toContain('Hello World');
    expect(html).toContain('Click me');
  });
});

describe('<CodeBlock>', () => {
  it('renders code with syntax highlighting', async () => {
    const html = await renderVNode(
      h(CodeBlock, {
        code: 'const x = 1;',
        language: 'javascript',
        theme: codeBlockThemes.dracula,
      }),
    );
    expect(html).toContain('<pre');
    expect(html).toContain('<code>');
    expect(html).toContain('const');
    expect(html).toContain('<span');
  });

  it('renders line numbers when enabled', async () => {
    const html = await renderVNode(
      h(CodeBlock, {
        code: 'line1\nline2\nline3',
        language: 'javascript',
        theme: codeBlockThemes.dracula,
        lineNumbers: true,
      }),
    );
    expect(html).toContain('>1<');
    expect(html).toContain('>2<');
    expect(html).toContain('>3<');
  });

  it('applies theme base styles to <pre>', async () => {
    const html = await renderVNode(
      h(CodeBlock, {
        code: 'hello',
        language: 'javascript',
        theme: codeBlockThemes.dracula,
      }),
    );
    expect(html).toContain('background');
    expect(html).toContain('width:100%');
  });

  it('applies custom font family', async () => {
    const html = await renderVNode(
      h(CodeBlock, {
        code: 'test',
        language: 'javascript',
        theme: codeBlockThemes.dracula,
        fontFamily: 'Fira Code',
      }),
    );
    expect(html).toContain('Fira Code');
  });

  it('replaces spaces with non-breaking space sequences', async () => {
    const html = await renderVNode(
      h(CodeBlock, {
        code: 'a b',
        language: 'markup',
        theme: codeBlockThemes.dracula,
      }),
    );
    // Spaces are replaced with \xA0\u200D\u200B for email compatibility
    expect(html).toContain('\xA0\u200D\u200B');
  });

  it('renders multi-line code with <br> tags', async () => {
    const html = await renderVNode(
      h(CodeBlock, {
        code: 'line1\nline2',
        language: 'markup',
        theme: codeBlockThemes.dracula,
      }),
    );
    expect(html).toContain('<br');
  });

  it('applies custom style on top of theme', async () => {
    const html = await renderVNode(
      h(CodeBlock, {
        code: 'test',
        language: 'javascript',
        theme: codeBlockThemes.dracula,
        style: { borderRadius: '8px' },
      }),
    );
    expect(html).toContain('border-radius:8px');
  });
});

describe('<CodeInline>', () => {
  it('renders code and span elements with Orange.fr fix', async () => {
    const html = await renderVNode(
      h(CodeInline, null, () => ['npm install']),
    );
    expect(html).toContain('<code');
    expect(html).toContain('cino');
    expect(html).toContain('<span');
    expect(html).toContain('cio');
    expect(html).toContain('npm install');
  });

  it('includes Orange.fr CSS fix in style tag', async () => {
    const html = await renderVNode(
      h(CodeInline, null, () => ['test']),
    );
    expect(html).toContain('<style>');
    expect(html).toContain('meta ~ .cino');
    expect(html).toContain('meta ~ .cio');
  });

  it('hides the span fallback by default', async () => {
    const html = await renderVNode(
      h(CodeInline, null, () => ['test']),
    );
    expect(html).toContain('display:none');
    expect(html).toContain('cio');
  });

  it('applies custom style', async () => {
    const html = await renderVNode(
      h(CodeInline, { style: { backgroundColor: '#f0f0f0' } }, () => ['test']),
    );
    expect(html).toContain('background-color:#f0f0f0');
  });
});
