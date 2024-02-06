import classes from './form.module.css';

import { useContext } from 'react';

import { createKey } from '../../methods';

import { Context } from '../../сontext';

import Ticket from '../../components/ticket';
import CinemaHall from './cinema-hall';
import DropList from './drop-list';


export default function Form({callback}) {
    
    // Отримуємо контекст.
    const { visitsInfo, dataTextLang } = useContext(Context);
    const { lang, tiket_page, schedule } = dataTextLang;
   

    // Функція виводить інформацію про обрані місця.
    const createListSeats = (info) => {
        const  {date, time, premiere, price, film, numPlaces} = info

        const newArr = [];

        numPlaces.forEach((e,i)=>{
            newArr.push(
                <Ticket key={createKey(i)}
                    data={e}
                    title={film.name}
                    premiere={premiere}
                    time={time}
                    date={date} />
            )

        })
        if(newArr.length > 0){
            return (
                <>
                    <h3 className={classes.info_card_title_list}>
                        {tiket_page.form_title}
                    </h3>
                    <ul className={classes.info_card_list}>
                        {newArr}
                    </ul>
                    <p className={classes.info_card_price}>
                        {tiket_page.total_price} 
                        <span>{newArr.length * price} ₴</span>
                    </p>

                    <button 
                        onClick={() => {
                            callback(visitsInfo)
                        }} 
                        className={classes.reserve_btn}  
                        type='button'>
                            {tiket_page.reser_seats_btn} 
                    </button>
                </>
            )
        }
        else return null;
    };

    // Функція виводить інформацію про фільм місця ціни.
    const showInfoForm = (info) =>{
        const { time, price, date } = info;
 
        return(
            <div className={classes.form_info}>
               
                <p className={classes.info_text}>
                    {tiket_page.set_date} <span>{date}</span> 
                </p>
                
                <p className={classes.info_text}>
                    {tiket_page.set_time} <span>{time} : 00</span>
                </p>

                <p className={classes.info_text}>
                    {schedule.price_text}: <span>{price} ₴</span>
                </p>

                {createListSeats(info)}
  
            </div>
        )
       
    }


    return(
        <div className={classes.form_wraper} lang={lang}>

            <div className={classes.form}>

                <DropList/>
    
               { showInfoForm(visitsInfo)}

            </div>

            <CinemaHall/>

        </div>
    )
};