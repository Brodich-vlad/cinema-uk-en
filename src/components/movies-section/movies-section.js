import classes from './MoviesSection.module.css';

import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../сontext';

import { creatNewVisit } from '../../methods';
import Pagination from '../pagination'
import Poster from '../poster';
import error_film from '../../image/background/error_film.png';
import icon_house from '../../image/svg/btn-icon/house.svg';

export default function MoviesSection(){
    // Отримуємо контекст.
    const {
        films,
        visitsInfo,
        callbackSetSearchInput,
        callbackSetVisitsInfo,
        dataTextLang,
        minusPage,
        filmsNumPage,
    } = useContext(Context);

    const { lang, movies_section } = dataTextLang;


    // Перехід між сторінками.
    let navigate = useNavigate();

    // Перехід на сторінку "details".
    const location = (id) => {
        navigate(`details/${id}`);
    }

    // Перехід на сторінку "tiket".
    const callbackTime = (id, time, premiere, price) =>{
        const newObj = creatNewVisit(visitsInfo, time, id, premiere, price, films)
        callbackSetVisitsInfo(newObj)
        navigate(`details/${id}/tiket`);
        callbackSetSearchInput('');
        minusPage(true);
    };

    // Скидання фільтрів.
    const clickIconError = () => {
        callbackSetSearchInput('');
        minusPage(true);
    };


    return(
        <section className={classes.movies_section}>

           {filmsNumPage > 1 && <button 
            type='button' 
            className={classes.home_btn}
            onClick={()=>{
                minusPage(true)
                callbackSetSearchInput('')}}>
                <>&#10094; </>
                <span className={classes.home_btn_img}>
                    <img src={icon_house} alt='icon_house'/>
                </span>
                <span className={classes.home_btn_text}>
                    {movies_section.home_btn}
                </span>
                <span> / </span>
                <span className={classes.home_btn_text}>
                    {movies_section.page}
                </span>
                <span>{filmsNumPage}</span>
            </button>}
            <h2 className={classes.movies_section__title}
            lang={lang}>
                {movies_section.title}
            </h2>
            {films && films.length !== 0 ?
                <ul className={classes.movies_section__list}>
                    {films &&
                        <Poster dataArr={films}
                            callbackLocation={location}
                            callbackTime={callbackTime} />}
                </ul> :
                <>
                    <h3 className={classes.movies_section__error_text }
                        lang={lang}> 
                    {movies_section.error_text}<br/>{movies_section.error_text1}
                    </h3>
                    <div className={classes.movies_section__error}
                        onClick={() => {
                             clickIconError()
                            }}>
                        <img src={error_film} alt='error_film'/>
                    </div>
                </>
            } 
           <Pagination/>
        </section>
    )
};