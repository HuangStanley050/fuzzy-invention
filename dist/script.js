// 0 to 70 (70) time befor cinema opens
// 70 to 150 (80) cinema opens to preshow starts
// 150 to 300 (150) preshow starts to movie starts
// 300 onwards movie in progress

const sectionDegrees = {
  beforeCinema: { label: "before cinema", start: 0, end: 70, range: 70 },
  cinemaOpen: { label: "cinema opens", start: 70, end: 150, range: 80 },
  preshow: { label: "preshow starts", start: 150, end: 300, range: 150 },
  movie: { label: "movie starts", start: 300, end: 600, range: 300 }
};

const eventTimes = {
  cinemaOpen: new Date("2021/06/04 10:00"),
  preShow: new Date("2021/06/04 10:30"),
  movieStart: new Date("2021/06/04 10:50"),
  movieEnd: new Date("2021/06/04 12:00")
};

const getStartRange = (eventTimes, currentTime, sectionDegrees) => {
  // get which section we should start from

  const { cinemaOpen, preShow, movieStart, movieEnd } = eventTimes;

  if (currentTime < cinemaOpen)
    return {
      ...sectionDegrees.beforeCinema,
      startSection: new Date("2021/06/04 08:00"),
      endSection: eventTimes.cinemaOpen
    };
  if (currentTime > cinemaOpen && currentTime < preShow) {
    return {
      ...sectionDegrees.cinemaOpen,
      startSection: eventTimes.cinemaOpen,
      endSection: eventTimes.preShow
    };
  }
  if (currentTime > preShow && currentTime < movieStart)
    return {
      ...sectionDegrees.preshow,
      startSection: eventTimes.preShow,
      endSection: eventTimes.movieStart
    };
  return {
    ...sectionDegrees.movie,
    startSection: eventTimes.movieStart,
    endSection: eventTimes.movieEnd
  };
};

let timeNow = new Date("2021/06/04 10:03");

let timeData = getStartRange(eventTimes, timeNow, sectionDegrees);

//console.log(timeData);

const findPercentageToStop = (timeNow, timeData) => {
  const lapsed = Math.floor(
    Math.abs(timeNow - timeData.startSection) / 1000 / 60
  );
  const totalDifference = Math.floor(
    Math.abs(timeData.endSection - timeData.startSection) / 1000 / 60
  );
  console.log(`time now is ${timeNow}`);
  console.log(
    `how many minutes have lapsed between now and the start section ${lapsed} mins`
  );
  console.log(
    `the time difference between start and end section is ${totalDifference} mins`
  );
  const result = (lapsed / totalDifference) * timeData.range;
  const roundedResult = parseInt((timeData.start + result).toFixed(0));

  return roundedResult;
  //   let lapsed = timeNow - start;
  //   let totalDifference = end - start;
  //   let result = (lapsed / totalDifference) * startRange.range;
  //   return (startRange.range + result).toFixed(0);
};

let test = findPercentageToStop(timeNow, timeData);
console.log(test);
// 1000 ----> cinema opens
// 1030 ----> preshow starts
// 1010 ----> time NOW
// 70 ----> start angle/section of the progress
// 80 ----> total units from start of the progress to end

// need to convert time to 24hours
// need to make sure the time difference are in minutes
// let result = parseInt(findPercentageToStop(1000, 1020, 1010, 70, 80));

// var diff = Math.abs(
//   new Date("2011/10/10 08:00") - new Date("2011/10/10 11:00")
// );
// var minutes = Math.floor(diff / 1000 / 60);
// console.log(minutes);