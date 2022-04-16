import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { del } from '../features/favoriteSlice'
import { AppDispatch, AppState } from '../store'
import { FavoriteMovie } from '../types'
import Icon from './Icon'

const Favorite: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    const favorites: FavoriteMovie[] = useSelector((state: AppState) => state.favorite.data)

    const deleteFavorite = (id: any) => dispatch(del({ id }))

    return (
        <div className="favorite-list">
            <div className="favorite-list__body body">
                <div className="favorite-list__header">
                    <h1 className="favorite-list__title title">
                        Favorite movies
                    </h1>
                </div>
                {favorites.length === 0 && <h1 className="item-favorite-list__nothing">:(</h1>}
                <div className="favorite-list__items">
                    {favorites.map(({id, name}: any) => (
                        <div className="item-favorite-list" key={name}>
                            <span className="item-favorite-list__title">
                                {name}
                            </span>
                            <div className="item-favorite-list__button-delete" onClick={() => deleteFavorite(id)}>
                                <Icon
                                    size={24}
                                    src="/close.svg"
                                    alt="close"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Favorite