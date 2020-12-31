import React, { Component } from 'react';
import JokeRow from './JokeRow';
import './DadJokes.css';
import joy from './joy.svg';

class DadJokes extends Component {
  render() {
    return (
      <section className="DadJokes">
        <header className="DadJokes-header">
          <h1 className="DadJokes-heading">
            <span>Dad</span> Jokes
          </h1>
          <img className="DadJokes-headerEmoji" src={joy} alt="Joy Emoji" />
          <button className="DadJokes-fetchBtn" type="button">
            Fetch Jokes
          </button>
        </header>
        <div className="DadJokes-jokeTable">
          <JokeRow />
          <JokeRow />
          <JokeRow />
          <JokeRow />
          <JokeRow />
          <JokeRow />
          <JokeRow />
          <JokeRow />
          <JokeRow />
        </div>
      </section>
    );
  }
}

export default DadJokes;
