export function parseJson(string: string | null) {
  try {
    return string && string.length ? JSON.parse(string) : [];
  } catch (error) {
    return [];
  }
}

export function stringifyJson(json: object | null) {
  if (!json) return null;
  try {
    return JSON.stringify(json);
  } catch (error) {
    return null;
  }
}
