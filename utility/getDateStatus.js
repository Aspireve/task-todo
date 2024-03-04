export default function getDateStatus(isoDate) {

  const today = new Date();
  today.setHours(24, 0, 0, 0);
  const targetDate = new Date(isoDate);
  console.log(targetDate < today, targetDate)

  if (targetDate < today) {
    return "TODAY";
  } else {
    return "FUTURE";
  }
}
