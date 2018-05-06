// filter is an fuction
export default (value, lang) => {
  const date = new Date(value)
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC'
  }
  return date.toLocaleString(lang, options) // ru | en
}
