const initialState = { favCities: [] }

function favCities(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_CITY':
      nextState = {
        ...state,
        favCities: [...state.favCities, action.value]
      };
      return nextState || state
    case 'UNSAVE_CITY':
      nextState = {
        ...state,
        favCities: state.favCities.filter(city => city.id !== action.value.id)
      };
      return nextState || state
    default:
      return state
  };
}

export default favCities;