import moment from "moment";
export const dateToFormatDate = (date) => {
  const fecha = moment(date);
  const hora = moment(date);

  let dateFormated = fecha
    .format("dddd DD [de] MMMM [de] yyyy, [a las ]")
    .toString()
    .toUpperCase();

  dateFormated += hora.format("HH:mm:ss a");

  return dateFormated;
};
