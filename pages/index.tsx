import type { GetStaticProps } from 'next'
import Modal from '../components/Modal'
import Favorite from '../components/Favorite'
import axios from 'axios'
import Gallery from '../components/Gallery'
import Head from 'next/head'
import { Movie } from '../types'
import React from 'react'


export const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get<Movie[]>("https://my-json-server.typicode.com/moviedb-tech/movies/list")
    const movies = res.data
    return {
        props: {
            movies
        }
    }
}

type IndexProps = {
    movies: Movie[]
}

const Index: React.FC<IndexProps> = ({ movies }) => {
    return (
        <React.Fragment>
            <Head>
                <title>Movies</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="wrapper">
                <Modal />
                <div className="app">
                    <Gallery movies={movies} />
                    <Favorite />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Index
