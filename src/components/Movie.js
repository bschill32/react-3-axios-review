import React, {Component} from 'react'

export default class Movie extends Component {
    constructor(props) {
        super()
        this.state = {
            movieInputVal: props.movie.title
        }
    }

    handleMovieEdit = (value) => {
        this.setState({
            movieInputVal: value
        })
    }

    render() {
        let {movieInputVal} = this.state
        let {movie} = this.props
        return (
            <div>
                <p>{movie.title}</p> 
                <input value={movieInputVal} onChange={(e) => this.handleMovieEdit(e.target.value)}/> 
                <button onClick={() => this.props.submitEdit(movieInputVal, movie.id)}>Submit edit</button>
                <button onClick={() => this.props.deleteMovie(movie.id)}>Delete Movie</button>
            </div>
        )
    }
}