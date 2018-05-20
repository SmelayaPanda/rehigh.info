export default (duration, LANG) => {
  let minutes = parseInt((duration / (1000 * 60)) % 60)
  let hours = parseInt((duration / (1000 * 60 * 60)))

  hours = (hours < 10) ? '0' + hours : hours
  minutes = (minutes < 10) ? '0' + minutes : minutes

  if (!hours || !minutes) {
    return 'no time'
  }
  let msg = {
    hours: {en: 'h', ru: 'ч'},
    min: {en: 'min', ru: 'мин'}
  }
  return `${hours} ${msg.hours[LANG]} ${minutes} ${msg.min[LANG]}`
}
