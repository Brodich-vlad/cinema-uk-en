import 'bootstrap/dist/css/bootstrap.min.css';
import './slider.css';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../сontext';

import Carousel from 'react-bootstrap/Carousel';
import { createKey, randomObjects } from '../../../methods';

import star from '../../../image/svg/star-filled.svg';


export default function Slider({ callbackLocation }) {

    // Отримуємо контекст.
    const { films, dataTextLang } = useContext(Context);

    const { text_premiere, lang } = dataTextLang;
    
    const [filmsSlider, setFilmsSlider] = useState(null);


    useEffect(() => {
        !filmsSlider && setFilmsSlider(randomObjects(films))
    },[]);

    const createCarouselItems = (data) =>{
        const Items = data.map(({id, name, info, rating, backdrop, premiere },i)=>{
            return(
                <Carousel.Item key={createKey(i)}  onClick={()=>{
                    callbackLocation(id)
                }} className='carousel__item'>
                    <img className="d-block w-100 carousel__item-img"
                    src={backdrop}
                    alt={name}
                    />

                   <Carousel.Caption className='carousel__info'>
                    <h2 lang={lang} className='carousel__info-title'>{name}</h2>

                    {premiere && 
                        <h3 className='carousel__info-title_second'
                        lang={lang} >
                            {text_premiere}
                        </h3>}

                    <p className='carousel__info-text' lang={lang}>{info}</p>
                    <div className='carousel__info-rating'>
                        <img src={star} alt='star'/>
                        <span>{rating}</span>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        })
        return Items
    };

    return (
        <>{ films &&
            <Carousel fade  indicators={false} interval={4000} controls={false}>
                {films && createCarouselItems(randomObjects(films))}
            </Carousel>}
        </>    
    )
};