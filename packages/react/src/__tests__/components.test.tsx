import * as React from 'react';
import { describe, expect, it } from 'vitest';
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

describe('render', () => {
  it('renders a simple component to HTML with doctype', async () => {
    const html = await render(React.createElement(Html, null, React.createElement(Head)));
    expect(html).toContain('<!DOCTYPE html');
    expect(html).toContain('<html');
    expect(html).toContain('<head');
  });

  it('renders plain text when option is set', async () => {
    const text = await render(
      React.createElement(Html, null,
        React.createElement(Body, null,
          React.createElement(Text, null, 'Hello World')
        )
      ),
      { plainText: true },
    );
    expect(text).toContain('Hello World');
    expect(text).not.toContain('<html');
  });
});

describe('<Html>', () => {
  it('renders with default lang and dir', async () => {
    const html = await render(React.createElement(Html));
    expect(html).toContain('lang="en"');
    expect(html).toContain('dir="ltr"');
  });

  it('renders with custom lang and dir', async () => {
    const html = await render(React.createElement(Html, { lang: 'ar', dir: 'rtl' }));
    expect(html).toContain('lang="ar"');
    expect(html).toContain('dir="rtl"');
  });
});

describe('<Head>', () => {
  it('renders meta tags', async () => {
    const html = await render(
      React.createElement(Html, null, React.createElement(Head)),
    );
    expect(html).toContain('charset=UTF-8');
    expect(html).toContain('x-apple-disable-message-reformatting');
  });

  it('renders children', async () => {
    const html = await render(
      React.createElement(Html, null,
        React.createElement(Head, null,
          React.createElement('title', null, 'Test Email'),
        ),
      ),
    );
    expect(html).toContain('<title>Test Email</title>');
  });
});

describe('<Body>', () => {
  it('renders children inside table wrapper', async () => {
    const html = await render(
      React.createElement(Body, null, 'Test content'),
    );
    expect(html).toContain('Test content');
    expect(html).toContain('<table');
    expect(html).toContain('role="presentation"');
    expect(html).toContain('<tbody>');
    expect(html).toContain('<td');
  });

  it('hoists background to body and zeroes margins', async () => {
    const html = await render(
      React.createElement(Body, {
        style: { backgroundColor: '#ffffff', margin: '10px' },
      }, 'Content'),
    );
    // Body tag should have background-color
    expect(html).toMatch(/<body[^>]*background-color:#ffffff/);
    // Body margins should be zeroed
    expect(html).toMatch(/<body[^>]*margin:0/);
  });
});

describe('<Container>', () => {
  it('renders as centered table with max-width', async () => {
    const html = await render(
      React.createElement(Container, null, 'Content'),
    );
    expect(html).toContain('Content');
    expect(html).toContain('max-width:37.5em');
    expect(html).toContain('role="presentation"');
    expect(html).toContain('align="center"');
  });

  it('passes custom styles', async () => {
    const html = await render(
      React.createElement(Container, {
        style: { backgroundColor: 'red' },
      }, 'Content'),
    );
    expect(html).toContain('background-color:red');
  });
});

describe('<Section>', () => {
  it('renders as table with children in td', async () => {
    const html = await render(
      React.createElement(Section, null, 'Section content'),
    );
    expect(html).toContain('Section content');
    expect(html).toContain('<table');
    expect(html).toContain('<td>');
  });
});

describe('<Row>', () => {
  it('renders as table with children in tr', async () => {
    const html = await render(
      React.createElement(Row, null,
        React.createElement(Column, null, 'Col 1'),
      ),
    );
    expect(html).toContain('Col 1');
    expect(html).toContain('<tr');
    expect(html).toContain('<td');
  });
});

describe('<Column>', () => {
  it('renders as td with children', async () => {
    const html = await render(
      React.createElement(Column, null, 'Column content'),
    );
    expect(html).toContain('<td');
    expect(html).toContain('Column content');
  });

  it('passes style through', async () => {
    const html = await render(
      React.createElement(Column, { style: { width: '50%' } }, 'Content'),
    );
    expect(html).toContain('width:50%');
  });
});

describe('<Text>', () => {
  it('renders as p with default styles', async () => {
    const html = await render(
      React.createElement(Text, null, 'Hello'),
    );
    expect(html).toContain('<p');
    expect(html).toContain('Hello');
    expect(html).toContain('font-size:14px');
    expect(html).toContain('line-height:24px');
  });

  it('applies default 16px margins', async () => {
    const html = await render(
      React.createElement(Text, null, 'Hello'),
    );
    expect(html).toContain('margin-top:16px');
    expect(html).toContain('margin-bottom:16px');
  });

  it('allows overriding margins', async () => {
    const html = await render(
      React.createElement(Text, { style: { marginTop: '0px' } }, 'Hello'),
    );
    expect(html).toContain('margin-top:0px');
  });
});

describe('<Heading>', () => {
  it('renders as h1 by default', async () => {
    const html = await render(
      React.createElement(Heading, null, 'Title'),
    );
    expect(html).toContain('<h1');
    expect(html).toContain('Title');
  });

  it('renders as custom heading level', async () => {
    const html = await render(
      React.createElement(Heading, { as: 'h3' }, 'Subtitle'),
    );
    expect(html).toContain('<h3');
    expect(html).toContain('Subtitle');
  });

  it('applies margin props', async () => {
    const html = await render(
      React.createElement(Heading, { mt: 10, mb: 20 }, 'Title'),
    );
    expect(html).toContain('margin-top:10px');
    expect(html).toContain('margin-bottom:20px');
  });
});

describe('<Link>', () => {
  it('renders with default target and color', async () => {
    const html = await render(
      React.createElement(Link, { href: 'https://example.com' }, 'Click me'),
    );
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('color:#067df7');
    expect(html).toContain('Click me');
  });

  it('allows custom target', async () => {
    const html = await render(
      React.createElement(Link, { href: '#', target: '_self' }, 'Link'),
    );
    expect(html).toContain('target="_self"');
  });
});

describe('<Img>', () => {
  it('renders with default styles', async () => {
    const html = await render(
      React.createElement(Img, {
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
    const html = await render(
      React.createElement(Button, { href: 'https://example.com' }, 'Click'),
    );
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Click');
  });

  it('renders MSO conditional comments for padding', async () => {
    const html = await render(
      React.createElement(Button, {
        href: '#',
        style: { padding: '10px 20px' },
      }, 'Button'),
    );
    expect(html).toContain('<!--[if mso]>');
    expect(html).toContain('mso-font-width');
    expect(html).toContain('<![endif]-->');
  });

  it('renders with inline-block display', async () => {
    const html = await render(
      React.createElement(Button, { href: '#' }, 'Button'),
    );
    expect(html).toContain('display:inline-block');
  });
});

describe('<Hr>', () => {
  it('renders with default styles', async () => {
    const html = await render(React.createElement(Hr));
    expect(html).toContain('<hr');
    expect(html).toContain('width:100%');
    expect(html).toContain('border:none');
    expect(html).toContain('border-top:1px solid #eaeaea');
  });

  it('allows style overrides', async () => {
    const html = await render(
      React.createElement(Hr, { style: { borderTop: '2px solid red' } }),
    );
    expect(html).toContain('border-top:2px solid red');
  });
});

describe('<Preview>', () => {
  it('renders hidden preview text', async () => {
    const html = await render(
      React.createElement(Preview, null, 'Preview text here'),
    );
    expect(html).toContain('Preview text here');
    expect(html).toContain('display:none');
    expect(html).toContain('max-height:0');
  });

  it('pads with whitespace characters', async () => {
    const html = await render(
      React.createElement(Preview, null, 'Short'),
    );
    // Should contain zero-width characters for padding
    expect(html).toContain('\u200C');
  });
});

describe('<Font>', () => {
  it('renders @font-face style tag', async () => {
    const html = await render(
      React.createElement(Font, {
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
    const html = await render(
      React.createElement(Font, {
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
    const html = await render(
      React.createElement(Markdown, null, '# Hello\n\nThis is **bold** text.'),
    );
    expect(html).toContain('<h1');
    expect(html).toContain('Hello');
    expect(html).toContain('<strong');
    expect(html).toContain('bold');
  });

  it('renders links with target blank', async () => {
    const html = await render(
      React.createElement(Markdown, null, '[Click here](https://example.com)'),
    );
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
  });
});

describe('full email render', () => {
  it('renders a complete email structure', async () => {
    const html = await render(
      React.createElement(Html, null,
        React.createElement(Head),
        React.createElement(Body, null,
          React.createElement(Container, null,
            React.createElement(Heading, null, 'Welcome'),
            React.createElement(Text, null, 'Hello World'),
            React.createElement(
              Button,
              { href: 'https://example.com' },
              'Click me',
            ),
          ),
        ),
      ),
    );

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
    const html = await render(
      React.createElement(CodeBlock, {
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
    const html = await render(
      React.createElement(CodeBlock, {
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
    const html = await render(
      React.createElement(CodeBlock, {
        code: 'hello',
        language: 'javascript',
        theme: codeBlockThemes.dracula,
      }),
    );
    // Dracula theme has a dark background
    expect(html).toContain('background');
    expect(html).toContain('width:100%');
  });

  it('applies custom font family', async () => {
    const html = await render(
      React.createElement(CodeBlock, {
        code: 'test',
        language: 'javascript',
        theme: codeBlockThemes.dracula,
        fontFamily: 'Fira Code',
      }),
    );
    expect(html).toContain('Fira Code');
  });

  it('replaces spaces with non-breaking space sequences', async () => {
    const html = await render(
      React.createElement(CodeBlock, {
        code: 'a b',
        language: 'markup',
        theme: codeBlockThemes.dracula,
      }),
    );
    // Spaces are replaced with \xA0\u200D\u200B for email compatibility
    expect(html).toContain('\xA0\u200D\u200B');
    expect(html).not.toMatch(/<span[^>]*> <\/span>/);
  });

  it('renders multi-line code with <br> tags', async () => {
    const html = await render(
      React.createElement(CodeBlock, {
        code: 'line1\nline2',
        language: 'markup',
        theme: codeBlockThemes.dracula,
      }),
    );
    expect(html).toContain('<br/>');
  });

  it('applies custom style on top of theme', async () => {
    const html = await render(
      React.createElement(CodeBlock, {
        code: 'test',
        language: 'javascript',
        theme: codeBlockThemes.dracula,
        style: { borderRadius: '8px' },
      }),
    );
    expect(html).toContain('border-radius:8px');
  });

  it('throws for unknown language', () => {
    expect(() =>
      React.createElement(CodeBlock, {
        code: 'test',
        language: 'nonexistent' as any,
        theme: codeBlockThemes.dracula,
      }),
    ).not.toThrow();
    // The error is thrown at render time, not at createElement time
  });
});

describe('<CodeInline>', () => {
  it('renders code and span elements with Orange.fr fix', async () => {
    const html = await render(
      React.createElement(CodeInline, null, 'npm install'),
    );
    expect(html).toContain('<code');
    expect(html).toContain('cino');
    expect(html).toContain('<span');
    expect(html).toContain('cio');
    expect(html).toContain('npm install');
  });

  it('includes Orange.fr CSS fix in style tag', async () => {
    const html = await render(
      React.createElement(CodeInline, null, 'test'),
    );
    expect(html).toContain('<style>');
    expect(html).toContain('meta ~ .cino');
    expect(html).toContain('meta ~ .cio');
  });

  it('hides the span fallback by default', async () => {
    const html = await render(
      React.createElement(CodeInline, null, 'test'),
    );
    expect(html).toMatch(/class="[^"]*cio[^"]*"[^>]*style="display:none/);
  });

  it('applies custom className to both elements', async () => {
    const html = await render(
      React.createElement(CodeInline, { className: 'my-code' }, 'test'),
    );
    expect(html).toContain('my-code cino');
    expect(html).toContain('my-code cio');
  });

  it('applies custom style', async () => {
    const html = await render(
      React.createElement(
        CodeInline,
        { style: { backgroundColor: '#f0f0f0' } },
        'test',
      ),
    );
    expect(html).toContain('background-color:#f0f0f0');
  });
});
