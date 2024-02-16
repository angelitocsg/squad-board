function timeDifference(
  timestamp1: number,
  timestamp2: number,
  r: "H" | "M" | "S" | "D",
) {
  var difference = timestamp1 - timestamp2;

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  var secondsDifference = Math.floor(difference / 1000);

  switch (r) {
    case "H":
      return hoursDifference;
    case "M":
      return minutesDifference;
    case "S":
      return secondsDifference;
    case "D":
      return daysDifference;
    default:
      return 0;
  }
}

type TDateFormat =
  | "dd/MM"
  | "dd/MM/yyyy"
  | "dd/MM/yyyy hh:mm:ss"
  | "yyyy-MM-dd"
  | "yyyy-MM-dd hh:mm:ss"
  | "yyyy-MM-dd hh:mm:ss:fff";

const format = (value: Date, format: TDateFormat) => {
  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, "0");
  const day = value.getDate().toString().padStart(2, "0");
  const hour = value.getHours().toString().padStart(2, "0");
  const minute = value.getMinutes().toString().padStart(2, "0");
  const seconds = value.getSeconds().toString().padStart(2, "0");
  const mills = value.getMilliseconds().toString().padStart(3, "0");

  switch (format) {
    case "yyyy-MM-dd hh:mm:ss:fff":
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}:${mills}`;

    case "yyyy-MM-dd hh:mm:ss":
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;

    case "yyyy-MM-dd":
      return `${year}-${month}-${day}`;

    case "dd/MM/yyyy hh:mm:ss":
      return `${day}/${month}/${year} ${hour}:${minute}:${seconds}`;

    case "dd/MM":
      return `${day}/${month}`;

    case "dd/MM/yyyy":
    default:
      return `${day}/${month}/${year}`;
  }
};

const toDate = (date: string) => {
  return new Date(`${date} 00:00:00`);
};

const dateHelper = {
  timeDifference,
  format,
  toDate,
};

export default dateHelper;
