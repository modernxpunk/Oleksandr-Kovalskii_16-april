import { Movie } from "../types"


export const selectAllGenresByMovies = (movies: Movie[]): Array<string> => {
    const uniqueGenres = new Set<string>()
    movies.forEach(({ genres }) => {
        genres.map(genre => {
            const currentGenre = genre.toLowerCase()
            if (!uniqueGenres.has(currentGenre)) {
                uniqueGenres.add(currentGenre)
            }
        })
    })
    return Array.from(uniqueGenres)
}