import React, { Component } from 'react';
import JokeRow from './JokeRow';
import './DadJokes.css';
import joy from './joy.svg';
import { checkStatusAndParse } from './util';

const API_URL = 'https://icanhazdadjoke.com/';

class DadJokes extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);

    const hasLocalStorage = localStorage.getItem('jokes') !== null;
    this.state = {
      jokes: hasLocalStorage ? JSON.parse(localStorage.getItem('jokes')) : [],
      loading: !hasLocalStorage,
    };

    const { jokes } = this.state;
    this.seenJokeIds = new Set(jokes.map((j) => j.id));
    this.changeRating = this.changeRating.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { jokes } = this.state;
    if (jokes.length === 0) {
      this.fetch10Jokes().catch((err) => {
        console.log(err);
      });
    }
  }

  handleClick() {
    this.setState({ loading: true }, () => {
      this.fetch10Jokes().catch((err) => {
        console.error(err);
      });
    });
  }

  async fetch10Jokes() {
    const options = { headers: { Accept: 'application/json' } };
    const jokes = [];
    const { alreadySeenJokeIds } = this.state;
    const { numJokesToGet } = this.props;
    while (jokes.length < numJokesToGet) {
      const newJoke = await fetch(API_URL, options).then(checkStatusAndParse);
      const { id, joke } = newJoke;
      const isUnique = !this.seenJokeIds.has(id);
      if (isUnique) {
        jokes.push({ id, joke, rating: 0 });
        this.seenJokeIds.add(id);
      } else {
        console.log('Duplicate: ', joke, id);
      }
    }
    this.setState(
      (st) => ({
        jokes: [...st.jokes, ...jokes].sort((a, b) => b.rating - a.rating),
        loading: false,
      }),
      () => {
        const { jokes: newJokes } = this.state;
        localStorage.setItem('jokes', JSON.stringify(newJokes));
      }
    );
  }

  changeRating(val, id) {
    this.setState((st) => {
      const updatedJokes = st.jokes.map((joke) => {
        if (joke.id === id) {
          return { ...joke, rating: joke.rating + val };
        }
        return joke;
      });
      const sortedJokes = updatedJokes.sort((a, b) => b.rating - a.rating);
      localStorage.setItem('jokes', JSON.stringify(sortedJokes));
      return {
        jokes: sortedJokes,
      };
    });
  }

  render() {
    const { jokes, loading } = this.state;
    const dadJokeHtml = (
      <section className="DadJokes">
        <header className="DadJokes-header">
          <h1 className="DadJokes-heading">
            <span>Dad</span> Jokes
          </h1>
          <img className="DadJokes-headerEmoji" src={joy} alt="Joy Emoji" />
          <button
            className="DadJokes-fetchBtn"
            type="button"
            onClick={this.handleClick}
          >
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
    return !loading ? dadJokeHtml : loadingHtml;
  }
}

export default DadJokes;
