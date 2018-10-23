let movies = [
    {
        id: 1,
        title: 'Superman'
    }
]
module.exports = {
    getMovies(req, res) {
        res.status(200).send(movies)
    },
    addMovie(req, res) {
        let {movieInput} = req.body 
        let id = movies.length > 0 ? (movies[movies.length - 1].id) + 1 : 1;
        let movie = {
            id,
            title: movieInput
        }
        movies.push(movie)
        res.status(200).send(movies)
    },
    deleteMovie(req, res) {
        let {id} = req.params
        id = Number(id)
        for(let i = 0; i < movies.length; i++) {
            if(movies[i].id === id) {
                movies.splice(i, 1)
            }
        }
        res.status(200).send(movies)
    },
    editMovie(req, res) {
        let {id} = req.params 
        let {newValue} = req.body
        id = Number(id)
        for(let i = 0; i < movies.length; i++) {
            if(movies[i].id === id) {
                movies[i].title = newValue
            }
        }
        res.status(200).send(movies)
    }
}