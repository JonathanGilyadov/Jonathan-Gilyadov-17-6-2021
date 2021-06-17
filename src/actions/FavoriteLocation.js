export const toggleFavoriteLocation = (name, key, temp) => {
  return {
    type: "TOGGLE_FAVORITE",
    name,
    key,
    temp,
  };
};
