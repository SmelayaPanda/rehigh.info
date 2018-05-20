export default (duration, FORMAT, LANG) => {
  if (FORMAT === 'WD') {
    let workDays = (duration / (1000 * 60 * 60 * 8)).toFixed(1)
    return workDays
  }

  let seconds = parseInt((duration / 1000) % 60)
  let minutes = parseInt((duration / (1000 * 60)) % 60)
  let hours = parseInt(duration / (1000 * 60 * 60))
  hours = (hours < 10) ? '0' + hours : hours
  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds

  if (FORMAT === 'HMS') {
    return hours + ':' + minutes + ':' + seconds
  }

  let msg = {
    hours: {en: 'h', ru: 'ч'},
    min: {en: 'min', ru: 'мин'},
    sec: {en: 's', ru: 'с'}
  }

  if (FORMAT === 'HM') {
    return `${hours} ${msg.hours[LANG]} ${minutes} ${msg.min[LANG]}`
  }
}
