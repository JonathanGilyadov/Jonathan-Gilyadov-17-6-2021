import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Paper, IconButton } from "@material-ui/core";
import { Favorite, OpenInNew } from "@material-ui/icons";
import { toggleFavoriteLocation } from "../actions/FavoriteLocation";
import "./Favorites.css";

const Favorites = () => {
  const favoritesLocations = useSelector((state) => state.favoritesLocations);
  const tempType = useSelector((state) => state.tempType);
  const dispatch = useDispatch();
  const [redirect, setRedirct] = useState({ isRedirecting: false, to: "" });

  const redirectToLocation = (key, name) =>
    setRedirct({ isRedirecting: true, to: `forecasts/${key}/${name}` });

  return (
    <div>
      {redirect.isRedirecting && <Redirect to={redirect.to} />}
      <h1 className="display-4 border-bottom">Favorites</h1>
      <div className="mt-3 d-flex flex-wrap">
        {favoritesLocations.map(({ name, key, temp }) => (
          <Paper
            className="location-favorite border d-flex justify-content-center flex-column"
            key={key}
          >
            {name}

            <span className="mt-auto">
              <h3 className="text-muted">
                {tempType === "CELSIUS"
                  ? `${temp.Metric.Value}°${temp.Metric.Unit}`
                  : `${temp.Imperial.Value}°${temp.Imperial.Unit}`}
              </h3>
            </span>

            <div className="mt-auto text-center">
              <IconButton
                onClick={() => dispatch(toggleFavoriteLocation(name, key))}
              >
                <Favorite className="text-danger" />
              </IconButton>
              <IconButton onClick={() => redirectToLocation(key, name)}>
                <OpenInNew />
              </IconButton>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
