import moment from "moment";

function getDateKey(date: Date): string {
  return moment(date).format("mm-dd-yyyy");
}

export default getDateKey;
