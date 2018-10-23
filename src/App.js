import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

//Components 
import Movie from './components/Movie'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      movieInput: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3005/api/movies').then( response => {
      this.setState({
        movies: response.data
      })
    }).catch(err => console.log('err', err))
  }

  handleMovieChange = (value) => {
    this.setState({
      movieInput: value
    })
  }

  addMovie = () => {
    let {movieInput} = this.state 
    axios.post('http://localhost:3005/api/movies', {movieInput}).then(response => {
      this.setState({
        movies: response.data,
        movieInput: ''
      })
    })
  }

  deleteMovie = (id) => {
    axios.delete(`http://localhost:3005/api/movies/${id}`).then( response => {
      this.setState({
        movies: response.data
      })
    })
  }

  submitEdit = (newValue, id) => {
    axios.put(`http://localhost:3005/api/movies/${id}`, {newValue}).then( response => {
      this.setState({
        movies: response.data
      })
    })
  }

  render() {
    let {movies, movieInput} = this.state
    return (
      <div className="App">
        <h3>Movies</h3>
        {
          movies.map( (movie, i) => {
            return (
              <Movie 
              movie={movie}
              deleteMovie={this.deleteMovie}
              submitEdit={this.submitEdit}
              key={i}
              ></Movie>
            )
          })
        }
        <input value={movieInput} onChange={(e) => this.handleMovieChange(e.target.value)}/><button onClick={this.addMovie}>Add Movie</button>
      </div>
    );
  }
}

export default App;
