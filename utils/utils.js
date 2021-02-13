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

// export const Youtube = (function () {
//   "use strict";

//   var video, results;

//   var getThumb = function (url, size) {
//     if (url === null) {
//       return "";
//     }
//     size = size === null ? "big" : size;
//     results = url.match("[\\?&]v=([^&#]*)");
//     video = results === null ? url : results[1];

//     if (size === "small") {
//       return "http://img.youtube.com/vi/" + video + "/2.jpg";
//     }
//     return "http://img.youtube.com/vi/" + video + "/0.jpg";
//   };

//   return {
//     thumb: getThumb,
//   };
// })();

export const getYoutubeImg = (id, size = "smalls") => {
  if (size === "small") {
    return "http://img.youtube.com/vi/" + id + "/2.jpg";
  }
  return "http://img.youtube.com/vi/" + id + "/0.jpg";
};
