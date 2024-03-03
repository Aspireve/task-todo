export default function getDateStatus(isoDate) {
  console.log(isoDate)
  const today = new Date();
  const targetDate = new Date(isoDate +1);
  targetDate.setHours(0, 0, 0, 0);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(startOfWeek.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  if (isoDate < today) {
    return "TODAY";
  } else {
    return "FUTURE";
  }
}
