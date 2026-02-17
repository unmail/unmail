import type { HtmlToTextOptions } from 'html-to-text';

export type RenderOptions =
  | {
      plainText?: false;
    }
  | {
      plainText?: true;
      htmlToTextOptions?: HtmlToTextOptions;
    };
