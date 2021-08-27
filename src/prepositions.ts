export function glueUpPrepositions(text: string): string {
  const PREPOSITIONS_AND_NUMBERS_REGEXP = /(\s(a|an|as|at|be|by|for|if|in|is|it|of|on|or|so|the|to|\d+)\s)/g;
  if (text === null) {
    return '';
  }
  return text.replace(PREPOSITIONS_AND_NUMBERS_REGEXP, ' $2\xa0');
}
