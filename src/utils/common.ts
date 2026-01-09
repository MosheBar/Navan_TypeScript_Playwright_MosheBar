/**
 * Extracts numeric characters and decimal points from a string and converts to number.
 * Example: "$1,234.56" -> 1234.56
 * @param text The string to parse
 * @returns The extracted number
 */
export function extractNumericValue(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, ''));
}
