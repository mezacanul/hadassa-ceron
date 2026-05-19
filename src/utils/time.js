function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  let hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

function timeToMeridiem(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  let displayHours = hours % 12;
  if (displayHours === 0) displayHours = 12;
  return `${displayHours
    .toString()
    .padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
}

/**
 * Get time slot options in 30-minute intervals
 * @param {string} start - Start time "HH:MM" (24h format)
 * @param {string} end - End time "HH:MM" (24h format)
 * @param {boolean} includeLast - Whether to include the end time (default: false)
 * @param {boolean} meridiem - If true, returns 12-hour format with AM/PM (default: false)
 * @returns {string[]}
 */
function getTimeSlotOptions(
  start,
  end,
  meridiem = false,
  includeLast = false
) {
  const slots = [];

  let current = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  while (
    current < endMinutes ||
    (includeLast && current === endMinutes)
  ) {
    const time = minutesToTime(current);

    slots.push({
      value: time,
      label: timeToMeridiem(time),
    });
    // if (meridiem) {
    //   slots.push(timeToMeridiem(time));
    // } else {
    //   slots.push(time);
    // }

    current += 30;
  }

  console.log("slots", slots);
  return slots;
}

export {
  getTimeSlotOptions,
  timeToMinutes,
  minutesToTime,
  timeToMeridiem,
};
