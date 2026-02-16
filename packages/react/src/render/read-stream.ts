import { Writable } from 'node:stream';
import type {
  PipeableStream,
  ReactDOMServerReadableStream,
} from 'react-dom/server.browser';

export async function readStream(
  stream: PipeableStream | ReactDOMServerReadableStream,
): Promise<string> {
  let result = '';
  const decoder = new TextDecoder('utf-8');

  if ('pipeTo' in stream) {
    const writableStream = new WritableStream({
      write(chunk: BufferSource) {
        result += decoder.decode(chunk, { stream: true });
      },
      close() {
        result += decoder.decode();
      },
    });
    await stream.pipeTo(writableStream);
  } else {
    const writable = new Writable({
      write(chunk: BufferSource, _encoding, callback) {
        result += decoder.decode(chunk, { stream: true });
        callback();
      },
      final(callback) {
        result += decoder.decode();
        callback();
      },
    });
    await new Promise<void>((resolve, reject) => {
      writable.on('pipe', (source) => {
        source.on('error', (err: Error) => {
          writable.destroy(err);
        });
      });
      writable.on('error', reject);
      writable.on('close', () => {
        resolve();
      });
      stream.pipe(writable);
    });
  }

  return result;
}
