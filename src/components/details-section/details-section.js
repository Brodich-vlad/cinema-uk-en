import classes from './details-section.module.css';

import { useContext } from 'react';
import { Context } from '../../сontext';

import { Link } from 'react-router-dom';

import { createKey } from '../../methods';

import star from '../../image/svg/star-filled.svg';
import btn_logo from '../../image/svg/btn-icon/film_play.svg';

export default function DetailsSection({
        id,
        data,
        filmDetails,
        trailer,
        clicTime,
        clickOpenPlayer,
        timeSession,
        location
    }) {


    // Отримуємо контекст.
    const { dataTextLang } = useContext(Context);
    const {
        lang,
        details_section,
        home_btn,
        text_premiere,
        schedule
    } = dataTextLang;

    const {name, info, price, image, backdrop, rating, date, premiere } = data;

    return (
        <div className={classes.details} 
            style={{background: `linear-gradient(180deg, rgba(0, 0, 0, 0.73) 20%, rgba(0, 0, 0, .73)), top center / cover fixed no-repeat url("${backdrop}")`}}>

            <Link className={classes.details_btn_back}
                lang={lang}
                to={'..'}>
                <>&#10094;</> 
                {home_btn}
            </Link>

            <div className={classes.details_wrapper} lang={lang}>
                <div className={classes.details_img_wrapper} >
                    { image ? <img src={image} alt={name}/> : null}
                </div>
                <div className={classes.details_info}>
                <h1 className={classes.info_main_title}>{name}</h1>

                    {filmDetails && 
                        <ul className={classes.info_genres_list}>
                            <li className={classes.genres_list_title}>
                                {details_section.genres_title}
                            </li>
                            {filmDetails.genres.map(({name},i)=>{
                                return <li key={createKey(i)}><span></span>{name}</li>
                            })}
                        </ul>
                    }



                    {premiere && 
                        <h3 className={classes.item_info_title_second}>
                           {text_premiere}
                        </h3>
                    }

                    <div className={classes.info_rating}>
                        <img src={star} alt='star' />
                        <span>{rating}</span>
                    </div>

                    {trailer && 
                        <button className={classes.schedule_btn} 
                            type='button'
                            onClick={ clickOpenPlayer }>
                            {details_section.trailer_btn}
                            <span  className={classes.trailer_btn_icon}>
                                <img src={btn_logo} alt='btn_logo'/>
                            </span>
                        </button>
                    }

                    { price && 
                        <>
                            {/* Розклад */}
                            <ul  className={classes.details_schedule}>
                                <li className={classes.details_schedule_title}>
                                    {details_section.schedule_title}
                                </li>

                                {price.map(({time, price, premiere},i) => {
                                    return (
                                <li key={createKey(i)}  className={classes.details_schedule_btn_wrapp} >
                                        <button className={classes.info_price_btn} type='button'
                                        onClick={()=>{
                                            clicTime(time, id, premiere, price)
                                        }}

                                        >{premiere 
                                            ?
                                        <><span>{schedule.time_text} {time} : 00</span><span> {text_premiere}</span> {schedule.price_text} 170 ₴</>
                                            : 
                                        <> <span>{schedule.time_text} {time} : 00</span> {schedule.price_text} {price} ₴</>}</button>
                                    </li>
                                    )
                                })}
                            </ul>

                            <button disabled={timeSession ? false : true} className={classes.schedule_btn} type='button'
                                onClick={(ev) => {
                                    ev.stopPropagation()
                                    location()
                                }}>
                                {details_section.choose_btn}
                            </button>
                        </>
                    }

                </div>     
            </div>

            <div lang={lang}>
                {info &&
                    <>
                        <h2 className={classes.info_title}>
                            {details_section.info_title}
                        </h2>
                        <p className={classes.info_text}>{info}</p>
                    </>
                }
                {filmDetails && 
                    <ul className={classes.info_companies_list}>
                        <li className={classes.companies_list_title}>
                        {details_section.companies_title}
                        </li>
                        {filmDetails.companies.map(({name},i)=>{
                            return <li lang='en' key={createKey(i)}><span></span>
                                {name}
                            </li>
                        })}
                    </ul>
                }

                <p>{date}</p>
            </div>    
        </div>    
    )

};