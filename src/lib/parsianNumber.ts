export function persianNumbers(input: string | undefined): string | undefined {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  if (input === undefined) {
    return undefined;
  }
  return input.replace(
    /\d/g,
    (match: string) => persianNumbers[parseInt(match)]
  );
}
