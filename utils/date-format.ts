export function formatDateShort(createdAt: any) {
  // Parse the date if it's not a Date object
  const date = new Date(createdAt);
  if (isNaN(date)) throw new Error("Invalid date");

  // Options for formatting the date
  const options = {
    month: "short", // "Jul"
    day: "numeric", // "15"
    year: "numeric", // "2024"
  };

  // Create an Intl.DateTimeFormat instance
  const formatter = new Intl.DateTimeFormat("en-US", options);

  // Format the date
  return formatter.format(date);
}
