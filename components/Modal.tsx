import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, del } from '../features/favoriteSlice'
import { close } from '../features/modalSlice'
import { AppDispatch, AppState } from '../store'
import { FavoriteMovie, Movie } from '../types'
import Icon from './Icon'

const Modal: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const isOpen: boolean = useSelector((state: AppState) => state.modal.isOpen)
    const favorites: FavoriteMovie[] = useSelector((state: AppState)  => state.favorite.data)
    const {id, name, img, year, description, starring, director, genres}: Movie = useSelector((state: AppState) => state.modal.data)

    const closeModal = () => dispatch(close())
    const addFavorite = (favoriteMovie: FavoriteMovie) => dispatch(add(favoriteMovie))
    const delFavorite = (id: number) => dispatch(del({id}))
    
    return (
        <React.Fragment>
            {isOpen &&
                <div className="modal" onClick={closeModal}>
                    <div className="modal__body" onClick={e => e.stopPropagation()}>
                        <div className="item-modal">
                            <div className="item-modal__button-delete icon" onClick={closeModal}>
                                <Icon
                                    src="/close.svg"
                                    alt="close"
                                />
                            </div>
                            <div className="item-modal__content">
                                <div className="item-modal__aside">
                                    <div className="item-modal__images">
                                        <div className="item-modal__images-poster">
                                            <Image
                                                src={img}
                                                objectFit="cover"
                                                layout='fill'
                                                alt="poster"
                                            />
                                        </div>
                                        <div className="item-modal__images-favorite-icon icon">
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
                                </div>
                                <div className="item-modal__main">
                                    <div className="item-modal-top">
                                        <h1 className="item-modal__title title">
                                            {name}
                                        </h1>
                                        <h3 className="item-modal__desc">{description}</h3>
                                    </div>
                                    <div className="item-modal__info">
                                        <div className="item-modal__item-info">
                                            <p className="item-modal__subtitle">Genres</p>
                                            <div className="item-modal__genres">
                                                {genres?.map(genre => <div className="item-modal__item-genre" key={genre}>{genre}</div>)}
                                            </div>
                                        </div>
                                        <div className="item-modal__item-info">
                                            <p className="item-modal__subtitle">Starrins</p>
                                            <div className="item-modal__starrins">
                                                {starring?.map(star => <div className="item-modal__item-starrins" key={star}>{star}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="item-modal__item-info">
                                            <p className="item-modal__subtitle">Year</p>
                                            <div className="item-modal__year">{year}</div>
                                        </div>
                                        <div className="item-modal__item-info">
                                            <p className="item-modal__subtitle">Director</p>
                                            <div className="item-modal__director">{director}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default Modal