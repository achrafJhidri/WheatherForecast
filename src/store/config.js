import { createStore } from 'redux';

import favCitiesReducer from './reducers/favCities';

export default createStore(favCitiesReducer);
