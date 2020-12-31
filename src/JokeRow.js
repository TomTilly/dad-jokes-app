import React, { Component } from 'react';
import thumbsUp from './thumbs-up.svg';
import thumbsDown from './thumbs-down.svg';
import concerned from './concerned.svg';
// import grinningOpen from './grinning-open.svg';
// import grinningSquinting from './grinning-squinting.svg';
// import neutral from './neutral.svg';
// import rofl from './rofl.svg';
// import slightSmile from './slight-smile.svg';
// import weary from './weary.svg';
import './JokeRow.css';

class JokeRow extends Component {
  render() {
    return (
      <div className="JokeRow">
        <div className="JokeRow-ratingContainer">
          <button
            className="JokeRow-ratingBtn"
            type="button"
            aria-label="Increase this joke's rating"
          >
            <img src={thumbsUp} alt="" />
          </button>
          <div className="JokeRow-rating">0</div>
          <button
            className="JokeRow-ratingBtn"
            type="button"
            aria-label="Decrease this joke's rating"
          >
            <img src={thumbsDown} alt="" />
          </button>
        </div>
        <div className="JokeRow-joke">Joke goes here</div>
        <img className="JokeRow-emoji" src={concerned} alt="Concerned Face" />
      </div>
    );
  }
}

export default JokeRow;
