import React, { Component } from 'react';
import JokeRow from './JokeRow';
import './DadJokes.css';
import joy from './joy.svg';
import { checkStatusAndParse } from './util';

const API_URL = 'https://icanhazdadjoke.com/';

class DadJokes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jokes: [],
      alreadySeenJokeIds: [],
      hasLoaded: false,
    };

    this.changeRating = this.changeRating.bind(this);
  }

  componentDidMount() {
    this.set10UniqueJokes().catch((err) => {
      console.log(err);
    });
  }

  async set10UniqueJokes() {
    const options = { headers: { Accept: 'application/json' } };
    let i = 0;
    const jokes = [];
    const newIds = [];
    const { alreadySeenJokeIds } = this.state;
    while (i < 10) {
      const newJoke = await fetch(API_URL, options).then(checkStatusAndParse);
      const { id, joke } = newJoke;
      const isUnique = !alreadySeenJokeIds.includes(id) || newIds.includes(id);
      if (isUnique) {
        i += 1;
        jokes.push({ id, joke, rating: 0 });
        newIds.push(id);
      }
    }
    this.setState((st) => ({
      jokes,
      alreadySeenJokeIds: [...st.alreadySeenJokeIds, ...newIds],
      hasLoaded: true,
    }));
  }

  changeRating(val, id) {
    this.setState((st) => {
      const updatedJokes = st.jokes.map((joke) => {
        if (joke.id === id) {
          return { ...joke, rating: joke.rating + val };
        }
        return joke;
      });
      return {
        jokes: updatedJokes,
      };
    });
  }

  render() {
    const { jokes, hasLoaded } = this.state;
    const dadJokeHtml = (
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
          {jokes.map((joke) => (
            <JokeRow
              key={joke.id}
              id={joke.id}
              joke={joke.joke}
              rating={joke.rating}
              changeRating={this.changeRating}
            />
          ))}
        </div>
      </section>
    );
    const loadingHtml = (
      <div className="DadJokes-loading">
        <img className="DadJokes-loadingIcon" src={joy} alt="" />
        Loading...
      </div>
    );
    return hasLoaded ? dadJokeHtml : loadingHtml;
  }
}

export default DadJokes;
