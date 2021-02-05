const ApiKey = "17e330397fee8a55928ef4dcba378607"
const oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall"
const currentWheather = "https://api.openweathermap.org/data/2.5/weather?"
const imageUrl = " http://openweathermap.org/img/w/ de +.png"


export const getWheatherByCoords = async ({longitude,latitude}) => {
  return fetchFunction(oneCallUrl+"?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+ApiKey)
} 

export const getWheatherByCityName = async (cityName) =>{
  return fetchFunction(currentWheather+`q=${cityName}&appid=${ApiKey}`)
}
  
fetchFunction = async (url ) => {
    try {
  
      const response = await fetch(
        url
      );
      const json = await response.json();

      return json;
    } catch (error) {

      throw error;
    }
  }
  
  