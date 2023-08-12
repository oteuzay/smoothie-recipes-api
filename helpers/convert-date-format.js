/**
 * The function `convertDateFormat` takes a date string as input and returns the date
 * in a specific format using the `toLocaleString` method.
 * @param dateString - The `dateString` parameter is a string representing a date. It
 * can be in any valid date format, such as "2021-01-01" or "January 1, 2021".
 * @returns a formatted date string in the format "dd/mm/yyyy hh:mm".
 */
module.exports = function convertDateFormat(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("tr-TR", options);
};
