export const getWeek = date => {
  var d1 = new Date();
  var d2 = new Date(date);
  d1.setMonth(0);
  d1.setDate(1);
  var s1 = Math.ceil((d2 - d1) / (24 * 60 * 60 * 1000));
  return Math.ceil((s1 + d1.getDay())  / 7);
}

export const getWeekDate = week => {
  let d = new Date()
  let result = {}
  d.setMonth(0)
  d.setDate(1)
  d.setDate((week - 1) * 7)
  for (let i = 0, str, month, date; i < 7; i++) {
    month = d.getMonth() + 1
    date = d.getDate()
    str = `${month}-${date}`
    result[str]=0
    // result.push(str)
    d.setDate(date+1)
  }
  return result
}


export const getMonthDate = month => {
  let result = {}
  let d = new Date()
  d.setMonth(month)
  d.setDate(0)
  for (let i = 1,len=d.getDate(); i <= len; i++) {
    result[i] = 0
  }
  return result
}
