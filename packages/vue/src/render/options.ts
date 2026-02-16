import type { HtmlToTextOptions } from 'html-to-text';

export type RenderOptions = {
  pretty?: boolean;
} & (
  | {
      plainText?: false;
    }
  | {
      plainText?: true;
      htmlToTextOptions?: HtmlToTextOptions;
    }
);
