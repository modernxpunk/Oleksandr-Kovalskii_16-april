import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, del } from '../features/favoriteSlice'
import { open } from '../features/modalSlice'
import useDebounce from '../hooks/useDebounce'
import { AppDispatch, AppState } from '../store'
import { FavoriteMovie, Movie } from '../types'
import { selectAllGenresByMovies } from '../utils/object'
import Icon from './Icon'

type GalleryProps = {
    movies: Movie[]
}

const Gallery: React.FC<GalleryProps> = ({ movies }) => {
    const dispatch = useDispatch<AppDispatch>()

    const favorites: FavoriteMovie[] = useSelector((state: AppState) => state.favorite.data)

    const [selectGenre, setSelectGenre] = useState<string>('')
    const [searchMovie, setSearchMovie] = useState<string>('')
    const [view, setView] = useState<boolean>(false)
    const [debounceSearchMovie, setDebounceSearchMovie] = useState<string>('')
    useDebounce(() => {
        setDebounceSearchMovie(searchMovie)
    })

    const openModal = (movieData: Movie) => dispatch(open(movieData))
    const addFavorite = (favoriteMovie: FavoriteMovie) => dispatch(add(favoriteMovie))
    const delFavorite = (id: number) => dispatch(del({id}))
    
    const filteredMovies = useMemo(() => {
        if (selectGenre === '') return movies
        return movies.reduce((filtered, movie): any => {
            if (movie.genres.map(genre => genre.toLowerCase()).includes(selectGenre)) {
                return [...filtered, movie]
            } else {
                return [...filtered]
            }
        }, [])
    }, [movies, selectGenre])

    const filteredAndSearchedMovies = useMemo(() => {
        if (debounceSearchMovie === '') return filteredMovies
        return filteredMovies.reduce((filtered, movie): any => {
            if (movie.name.toLowerCase().includes(debounceSearchMovie)) {
                return [...filtered, movie]
            } else {
                return [...filtered]
            }
        }, [])
    }, [debounceSearchMovie, filteredMovies])

    return (
        <div className={`gallery ${view && "rows"}`}>
            <div className="gallery__body body">
                <div className="gallery__header">
                    <h1 className="gallery__title title">
                        Movies Gallery
                    </h1>
                </div>
                <div className="gallery__filters">
                    <div className="item-filter">
                        <select className="item-filter__select-genre" value={selectGenre} onChange={e => setSelectGenre(e.target.value)}>
                            <option value="">Select ganre</option>
                            {selectAllGenresByMovies(movies).map(genre => 
                                <option key={genre} value={genre}>{genre}</option>
                            )}
                        </select>
                    </div>
                    <div className="item-filter__search">
                        <Icon
                            className="icon"
                            src="/search.png"
                            alt="search"
                        />
                        <input
                            className="item-filter__input-search"
                            value={searchMovie}
                            onChange={e => setSearchMovie(e.target.value)}
                            type="search"
                            placeholder='Search...'
                        />
                    </div>
                    <div className="item-filter">
                        <div className="item-filter__button active">
                            {view
                                ?
                                    <Icon
                                        className="icon"
                                        src="/grid.png"
                                        alt="view as grid"
                                        onClick={() => setView(!view)}
                                    />
                                :
                                    <Icon
                                        className="icon"
                                        src="/rows.png"
                                        alt="view as rows"
                                        onClick={() => setView(!view)}
                                    />
                            }
                        </div>
                    </div>
                </div>
                {searchMovie && filteredAndSearchedMovies.length === 0 &&
                    <h1 className="gallery__item-nothing">:(</h1>
                }
                <div className="gallery__items">
                    {filteredAndSearchedMovies.map(({ id, name, img, year, description, starring, director, genres }) => {
                        return (
                            <div className="item-gallery" key={id} onClick={() => openModal({ id, name, img, year, description, starring, director, genres })}>
                                <div className="item-gallery__images">
                                    <div className="item-gallery__poster">
                                        <Image
                                            src={img}
                                            objectFit="cover"
                                            width={150}
                                            height={225}
                                            alt="poster"
                                        />
                                    </div>
                                    <div className="item-gallery__favorite-icon icon" onClick={e => e.stopPropagation()}>
                                        {favorites.some((favorite: { id: number }) => favorite.id === id)
                                            ?
                                                <Icon
                                                    src="/star-solid.svg"
                                                    alt="favorite"
                                                    onClick={() => delFavorite(id)}
                                                />
                                            :
                                                <Icon
                                                    src="/star-regular.svg"
                                                    alt="favorite"
                                                    onClick={() => addFavorite({ id, name })}
                                                />
                                        }
                                    </div>
                                </div>
                                <div className="item-gallery__text">
                                    <div className="item-gallery__title">{name}</div>
                                    <div className='item-gallery__genres'>
                                        {view && genres.map(genre => (
                                            <div className='item-gallery__item-genre' key={genre}>
                                                {genre}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="item-gallery__year">{year}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default Gallery