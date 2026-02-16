export function escapeClassName(className: string) {
  return className.replace(
    /([^\\]|^)(?=([^a-zA-Z0-9\-_]))/g,
    (match, prefixCharacter: string, characterToEscape: string) => {
      if (prefixCharacter === '' && characterToEscape === '\\') return match;
      return `${prefixCharacter}\\`;
    },
  );
}
