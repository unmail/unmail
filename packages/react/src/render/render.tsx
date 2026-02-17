import { convert } from 'html-to-text';
import { Suspense } from 'react';
import { createErrorBoundary } from './error-boundary';
import type { RenderOptions } from './options';
import { plainTextSelectors } from './plain-text-selectors';
import { readStream } from './read-stream';

const doctype =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

export async function render(
  element: React.ReactElement,
  options?: RenderOptions,
): Promise<string> {
  const reactDOMServer = await import('react-dom/server').then((m) => {
    if ('default' in m) {
      return m.default;
    }
    return m;
  });

  let markup!: string;
  await new Promise<void>((resolve, reject) => {
    if (
      Object.hasOwn(reactDOMServer, 'renderToReadableStream') &&
      typeof WritableStream !== 'undefined'
    ) {
      const ErrorBoundary = createErrorBoundary(reject);
      reactDOMServer
        .renderToReadableStream(
          <ErrorBoundary>
            <Suspense>{element}</Suspense>
          </ErrorBoundary>,
          {
            progressiveChunkSize: Number.POSITIVE_INFINITY,
            onError(error: unknown) {
              throw error;
            },
          },
        )
        .then((stream) => readStream(stream))
        .then((result) => {
          markup = result;
          resolve();
        })
        .catch(reject);
    } else {
      const ErrorBoundary = createErrorBoundary(reject);
      const stream = reactDOMServer.renderToPipeableStream(
        <ErrorBoundary>
          <Suspense>{element}</Suspense>
        </ErrorBoundary>,
        {
          async onAllReady() {
            markup = await readStream(stream);
            resolve();
          },
          onError(error: unknown) {
            reject(error);
          },
          progressiveChunkSize: Number.POSITIVE_INFINITY,
        },
      );
    }
  });

  if (options?.plainText) {
    return convert(markup, {
      selectors: plainTextSelectors,
      ...(options.plainText === true
        ? (options as { htmlToTextOptions?: Record<string, unknown> })
            .htmlToTextOptions
        : {}),
    });
  }

  const html = `${doctype}${markup.replace(/<!DOCTYPE.*?>/, '')}`;

  return html;
}
