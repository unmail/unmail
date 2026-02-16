import * as prettier from 'prettier/standalone';
import * as prettierHtml from 'prettier/plugins/html';

export async function pretty(html: string): Promise<string> {
  return prettier.format(html, {
    parser: 'html',
    plugins: [prettierHtml],
    htmlWhitespaceSensitivity: 'ignore',
  });
}
