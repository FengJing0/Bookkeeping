export const getWeek = date => {
  var d1 = new Date();
  var d2 = new Date(date);
  d2.setMonth(0);
  d2.setDate(1);
  var s1 = Math.ceil((d1 - d2) / (24 * 60 * 60 * 1000));
  return Math.ceil(s1 / 7);
}
