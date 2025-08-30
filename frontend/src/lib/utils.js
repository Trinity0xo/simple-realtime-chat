export const formatMessageDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return time;
  } else if (isYesterday) {
    return `Yesterday ${time}`;
  } else {
    return (
      date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      }) + ` ${time}`
    );
  }
};
