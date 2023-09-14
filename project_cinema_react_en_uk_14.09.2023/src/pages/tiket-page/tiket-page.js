import classes from './tiket-page.module.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import star from '../../image/svg/star-filled.svg';

import { Context } from '../../сontext';
import ModalFinish from '../../components/modal-finish';
import Form from '../../components/form';

import  HistoryVisits  from '../../components/history-visits';



export default function TiketPage() {
   // Отримуємо контекст.
    const { 
        visitsInfo, 
        historyVisits, 
        callbackSetHistoryVisits, 
        dataTextLang,
    } = useContext(Context);

    const { lang, home_btn, text_premiere } = dataTextLang;

    // Відправляє на головну сторінку.
    let navigate = useNavigate();

    useEffect(() => {
        if (!visitsInfo.filmId && !openModal) {
            navigate(-1)    
        }
    })


    // Прокручуэмо сторінку в гору.
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    },[])


     // Стан модалки.
    const [openModal, setOpenModal] = useState(false);

    // Функція клік бронювати місце.
    const clickReserve = (arr) => {
        callbackSetHistoryVisits(arr)
        setOpenModal(true)
        setTimeout(() => {
            setOpenModal(false) 
            navigate('/')
        }, 3000)
    }

    return (
        <main className={classes.tiket_page}
            lang={lang}
            style={visitsInfo.film && 
            {background: `linear-gradient(180deg, rgba(0, 0, 0, 0.3) 100%, rgba(0, 0, 0, 0.1)), top center / cover no-repeat fixed url("${visitsInfo.film.backdrop}")`}}>
            
        <Link className={classes.details_btn_back} 
            to={'..'}>
            <>&#10094;</> 
            {home_btn}
        </Link>
            
            <div className={classes.tiket_page_wrapper}>

                <div className={classes.tiket_page_title_wrapper}>
                    <h2 className={classes.tiket_page_title}>
                        {visitsInfo.film.name}
                    </h2>
                    {visitsInfo.premiere && 
                        <h3 className={classes.tiket_page_title_second}>
                            {text_premiere}
                        </h3>
                    }
                    <div className={classes.tiket_page_title_rating}>
                        <img className={classes.title_rating_img} src={star} alt='star' />
                        <span>{visitsInfo.film.rating}</span>
                    </div>
                </div>
                <Form callback={clickReserve}/>

                {historyVisits.length > 0 && 
                    <HistoryVisits historyData={historyVisits}/>
                }
            </div>

            {openModal && <ModalFinish/>}
        </main>
    )
};