import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Loader from '../../components/loader';
import Error from '../../components/error';

import classes from './layout-page.module.css';

import { useState , useEffect} from "react";

import {
    createNewData,
    createNewDataStars,
    sortRating,
    urlFilms,
    urlStars,
    myFetch,
    urlSearch
} from '../../methods';

import {dataTextEn, dataTextUk} from '../../datas-text-page';

import { Context, visits, historyVisit} from '../../сontext';

export default function LayoutPage() {
    // Стан пошукової строки.
    const [search, setSearch] = useState('');
    // Стан масиву фільмів.
    const [filmsData, setFilmsData] = useState(null);
      // Стан масиву фільмів.
    const [filmsNumPage, setFilmsNumPage] = useState(1);
    // Стан масиву зірок.
    const [starsData, setStarsData] = useState(null);
    // Стан замовлення.
    const [visitsInfo, setVisitsInfo] = useState(visits)
    // Стан історії замовлень.
    const [historyVisits, setHistoryVisits] = useState(historyVisit);

    // Стан помилок.
    const [error, setError] = useState(null);
    // Стан лоудера.
    const [loader, setLoader] = useState(false);

    // Стан мови.
    const [lang, setLang] = useState('uk-Uk');
    const [dataTextLang, setDataTextLang] = useState(dataTextUk);

    // Функція слідкує за помилками.
    const filtrError = (res, flag, search=false) =>{
        if(flag === 'films'){
            if(res.results){
                setFilmsData(sortRating(createNewData(res.results, filmsNumPage,search)))
                setFilmsNumPage(res.page !==filmsNumPage ? res.page : filmsNumPage)
            }
            else {
                setError(res)
                console.log(res)
            }
        }
        if(flag === 'stars'){
            if(res.results){
                setStarsData(createNewDataStars(res.results))
            }
            else setError(res)
        }
        setLoader(false)
    }



    // Робимо запит на сервер.
    useEffect(() => {
			setLoader(true);

			window.scrollTo({
				top: 0,
				left: 0
			});

			if (search === '') {
				myFetch(urlFilms(lang, filmsNumPage))
					.then(response => filtrError(response, 'films', true))
					.catch(err => console.error(err));
			} else {
				myFetch(urlSearch(search, lang, filmsNumPage))
					.then(response => filtrError(response, 'films'))
					.catch(err => console.error(err));
			}
		}, [lang, filmsNumPage, search]);


    useEffect(() => {
			myFetch(urlStars(lang))
				.then(response => filtrError(response, 'stars'))
				.catch(err => console.error(err));
		}, [lang]);


    // Функції пагінації.
    const addPage = () =>{
        setFilmsNumPage(filmsNumPage < 32 ? filmsNumPage + 1 : filmsNumPage);
    };

    const minusPage = (flag=false) =>{
        if(flag){
            setFilmsNumPage(1);
        }else{
            if(filmsNumPage > 1){
                setFilmsNumPage(filmsNumPage - 1)
            }else setFilmsNumPage(filmsNumPage)
        }
    };

    // Функція зміни мови.
    const callbackSetLang = () =>{
        if(lang === 'uk-Uk'){
            setLang('en-US')
            setDataTextLang(dataTextEn);
        }else if(lang === 'en-US'){
            setLang('uk-Uk')
            setDataTextLang(dataTextUk);
        }
    };

    // Функція зміни стану пошуку.
    const callbackSetSearchInput = (str) => {
        setSearch(str)
    }

    // Функція зміни стану замовлень.
    const callbackSetVisitsInfo = (newVisit) =>{
        setVisitsInfo({...visitsInfo, ...newVisit})
    }

    // Функція зміни стану замовлень.
    const callbackSetHistoryVisits = (newVisit) =>{
        setHistoryVisits([newVisit, ...historyVisits])
        setVisitsInfo(visits)
    }

    // Прокручуємо сторінку в гору.
    const clickBtnTop = () =>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    return(
        <>
            <div className={classes.layout_page}>
                <Context.Provider value={{
                    lang: lang,
                    dataTextLang:dataTextLang,
                    films: filmsData,
                    filmsNumPage:filmsNumPage,
                    stars: starsData,
                    search: search,
                    visitsInfo: visitsInfo,
                    historyVisits: historyVisits,
                    callbackSetSearchInput,
                    callbackSetVisitsInfo,
                    callbackSetHistoryVisits,
                    callbackSetLang,
                    addPage,
                    minusPage,
                }}>
                    <Header/>
                    <div className={classes.wrapper}>
                        {error ? 
                            <Error text={error.status_message}/>:
                            filmsData && 
                            starsData && 
                            <Outlet/>
                        }
                    </div>

                    {loader && <Loader/>}

                    <button onClick={clickBtnTop} className={classes.btn_top}  type='button'><span>⇧</span></button>

                    <Footer/>
                </Context.Provider>

            </div>
        </>  
    )
    
};