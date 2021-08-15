import React from "react";

import classes from "./Track.module.css";

const Track = (props) => {
  return (
    <div>
      <p><strong>{props.responseObj.title}</strong></p>
      {props.responseObj.genre}
      
      {props.error && <small className={classes.Small}>There was an error with the request :(</small>}
      {props.loading && <div className={classes.Loader}>Loading...</div>}
    </div>
  )
}

export default Track