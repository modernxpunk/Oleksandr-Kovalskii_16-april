export type FavoriteMovie = {
    id: number,
    name: string
}

export interface Movie {
    id: number
    name: string;
    img: string;
    year: string;
    description: string;
    starring: string[];
    director: string;
    genres: string[];
}