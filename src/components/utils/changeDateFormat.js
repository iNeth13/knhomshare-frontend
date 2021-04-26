const changeDateFormat = (createdAt) => {
  const date = new Date(new Date(createdAt));
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

export default changeDateFormat;
