export const formatDateForInput = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
};

export const parseInputDate = (inputDate) => {
  if (!inputDate) return null;

  try {
    // Create date in local timezone but at midnight
    const date = new Date(inputDate);
    date.setHours(0, 0, 0, 0);
    return isNaN(date.getTime()) ? null : date.toISOString();
  } catch (error) {
    console.error("Date parsing error:", error);
    return null;
  }
};
