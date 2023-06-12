export function kebabCaseFormatting(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}
export function camelCaseFormatting(str) {
  return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() })
}
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export function capitalizeAll(str) {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
}
export function dateTimeToInput(datetime) {
  let d = new Date(datetime)
  return `${d.getFullYear()}-${(d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)}-${d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()}T${d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()}:${d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes()}`
}
export function displayDateTime(datetime) {
  let d = new Date(datetime)
  return `${d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()}/${(d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()}:${d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes()}`
}
export function maxStringLenght(str, max) {
  return str.length > max ? str.substring(0, max) + '...' : str
}