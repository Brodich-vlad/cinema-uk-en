import classes from './home-page.module.css';

import MainSection from '../../components/main-section';
import MoviesSection from '../../components/movies-section';
import PopularStarsSection from '../../components/popular-stars-section';

import { useContext, useEffect } from 'react';

import { Context } from '../../сontext';

export default function HomePage() {
    const { search, filmsNumPage } = useContext(Context);   
    // Прокручу сторінку в гору.
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    },[])


    return (
        <main  className={classes.home_page}>
           {search === '' && filmsNumPage === 1 && <MainSection/>}
            <MoviesSection/>
           {search === '' && filmsNumPage === 1 &&  <PopularStarsSection/>}
        </main>
    )
};