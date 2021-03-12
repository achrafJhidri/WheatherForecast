const night = require("../../assets/night.jpg");
const day = require("../../assets/day.jpg");

exports.getImage = (forecast) => {
  if ( forecast && 
    forecast.current.dt >= forecast.current.sunrise &&
    forecast.current.dt <= forecast.current.sunset
  )
    return day;
  return night;
};
