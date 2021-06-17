let intialState = "CELSIUS";

const tempType = (state = intialState, action) => {
  switch (action.type) {
    case "FAHRENHEIT":
      return "FAHRENHEIT";
    case "CELSIUS":
      return "CELSIUS";
    default:
      return state;
  }
};

export default tempType;
