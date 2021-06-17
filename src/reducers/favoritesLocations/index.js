let intialState = [];

const favoriteLocations = (state = intialState, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const newState = [...state];
      const index = newState.findIndex((item) => item.key === action.key);
      if (index === -1) {
        newState.push({
          name: action.name,
          key: action.key,
          temp: action.temp,
        });
      } else {
        newState.splice(index, 1);
      }
      return newState;
    default:
      return state;
  }
};

export default favoriteLocations;
