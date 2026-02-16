/**
 * Strips Vue SSR artifacts from rendered HTML:
 * - Fragment comments (<!--[-->, <!--]-->)
 * - All HTML comments
 * - data-v-inspector attributes
 * - <script> and <template> tags
 * - <unmail-tailwind> wrapper tags (preserving inner content)
 */
export function cleanup(str: string) {
  if (!str || typeof str !== 'string') return str;

  return str
    .replace(/ data-v-inspector="[^"]*"/g, '')
    .replace(/<!--\[-->/g, '')
    .replace(/<!--\]-->/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script>[\s\S]*?<\/script>/g, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<\/?unmail-tailwind[^>]*>/g, '');
}
