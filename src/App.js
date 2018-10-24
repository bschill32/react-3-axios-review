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
  //componentDidMount is one of the functions that gets called in the components lifecycle. Its a good place to handle any asynchronous code or axios requests.
  //A full list of lifecycle methods are here if you're interested https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    //.get is used to grab data. In CRUD it corresponds with Read
    //Create - axios.post 
    //Read - axios.get 
    //Update - axios.put
    //Delete - axios.delete
    axios.get('http://localhost:3005/api/movies')
    .then(response => {
      //When making asynchronous calls to other servers, we need to use .then to catch the response from the external server.
      this.setState({
        movies: response.data
      })
    }).catch(err => console.log('err', err))
    // .catch(() => toast.error("didn't work"));
  }

  handleMovieChange = (value) => {
    this.setState({
      movieInput: value
    })
  }

  addMovie = () => {
    let {movieInput} = this.state 
    //Since we need to create a movie here, we use post. We also need to pass some data that can be used for a new movie so we pass an object as the second argument with the movieInput from state
    axios.post('http://localhost:3005/api/movies', {movieInput})
    .then(response => {
      this.setState({
        movies: response.data,
        movieInput: ''
      })
    })
  }

  deleteMovie = (id) => {
    axios.delete(`http://localhost:3005/api/movies/${id}`)
    .then(response => {
      this.setState({
        movies: response.data
      })
    })
  }

  submitEdit = (newValue, id) => {
    axios.put(`http://localhost:3005/api/movies/${id}`, {newValue})
    .then( response => {
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
        <input value={movieInput} onChange={(e) => this.handleMovieChange(e.target.value)}/>
        <button onClick={this.addMovie}>Add Movie</button>
      </div>
    );
  }
}

export default App;
