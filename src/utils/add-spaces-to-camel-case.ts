export function addSpacesToCamelCase(str: string) {
  return str && str.replace(/([a-z])([A-Z])/g, '$1 $2');
}
