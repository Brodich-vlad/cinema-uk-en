import classes from './details-page.module.css';

import { useContext, useEffect, useState} from 'react';
import { useParams,  useNavigate } from 'react-router';

import { 
    creatNewVisit,  
    myFetch, 
    urlVideo, 
    urlMovie, 
    searchObject,
} from '../../methods';

import { Context } from '../../сontext';

import Player from '../../components/player';
import DetailsSection  from '../../components/details-section';

export default function DetailsPage(){
    // Отримуємо контекст.
    const { 
        films,
        visitsInfo,
        callbackSetVisitsInfo,
        lang
    } = useContext(Context);

    // Отримання id сторінки.
    const { id } = useParams();

    // Стан плеєра.
    const [openPlayer, setOpenPlayer] = useState(false);

    // Стан trailer.
    const [trailer, setTrailer] = useState(null);

    // Стан детальної інформації про фільм.
    const [filmDetails, setFilmDetails] = useState(null);

    // Стан  фільму.
    const [film, setFilm] = useState(null);
    
    // Стан чи обрав користувач час.
    const [timeSession, setTimeSession] = useState(null);

    // Функці зміни стану плеєра.
    const clickOpenPlayer = () =>{
        setOpenPlayer(openPlayer ? false : true)
    }
    
    // Функці зміни стану детальної інформації.
    const filmDetailsChange = (data) =>{
        const newObj = {
            genres:[...data.genres],
            companies:[...data.production_companies],
        }
        setFilmDetails({...newObj})
    }
    // Знаходимо фільм по ід.
    useEffect(() => {
            setFilm(searchObject(id,films))
    },[])

    useEffect(() => {
        // Прокручуємо сторінку в гору.
        window.scrollTo({
            top: 0,
            left: 0,
        });
        // Робимо запит для отримання відео.
        myFetch(urlVideo(id, lang))
            .then(response => {
                if(response.results.length > 0){
                    setTrailer(response.results[response.results.length-1])
                } 
            })
        // Робимо запит для отримання детальної інформації про фільм.
        myFetch(urlMovie(id, lang))
            .then(response => {
                filmDetailsChange(response)
            })    
      
    },[id,lang]);
    
    // Очищення візитів.
    useEffect(()=>{
        callbackSetVisitsInfo({...visitsInfo, numPlaces: []})
    },[])

    // Навігація між сторінками.
    let navigate = useNavigate();

    const location = () => {
        callbackSetVisitsInfo(timeSession)
        navigate('tiket');
    }
 
    // Створюємо обект замовлення.
    const clicTime = (time, id, premiere, price) =>{
        const newObj = creatNewVisit(visitsInfo, time, id, premiere, price, films)
        setTimeSession(newObj);
    }


    return(
        <main className={classes.details_page} >

            {film && 
            <DetailsSection
                id={id}
                data={film}
                filmDetails={filmDetails}
                trailer={trailer}
                timeSession={timeSession}
                clicTime={clicTime}
                clickOpenPlayer={clickOpenPlayer}
                location={location}
            />}

            
           {openPlayer && 
                <Player 
                    video={trailer && trailer} 
                    close={clickOpenPlayer} />
            }
        </main>
    )
};