export function persianNumbers(input: string | number | undefined): string | undefined {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  
  if (input === undefined) {
    return undefined;
  }

  const inputStr = input.toString();

  return inputStr.replace(/\d/g, (match: string) => persianNumbers[parseInt(match)]);
}
