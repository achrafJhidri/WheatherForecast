const night = require("../../assets/night.jpg");
const day = require("../../assets/day.jpg");

exports.getImage = (forecast) => {
  console.log(forecast.current.dt - forecast.current.sunset);
  console.log(Date.now());
  if (
    forecast.current.dt >= forecast.current.sunrise &&
    forecast.current.dt <= forecast.current.sunset
  )
    return day;
  return night;
};
