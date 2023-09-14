import classes from './history-visits.module.css';

import { Context } from '../../сontext';
import { useContext } from 'react';
import { createKey } from '../../methods';
import Ticket from '../ticket';



export default function HistoryVisits({historyData}){
    // Отримуємо контекст.
    const { dataTextLang } = useContext(Context);

    const { lang, tiket_page, text_premiere, schedule } = dataTextLang;
    // Функція виводить інформацію про історію замовлень.
    const showHistoryVisits = (data) =>{
        const newArr = data.map(({film, numPlaces, premiere, date, time},i)=>{

            return(
                <li key={createKey(i)} 
                    className={classes.info_story_list_item}
                    lang={lang}>
                    <h3 className={classes.info_story_title}>{film.name}</h3>
                    {premiere &&
                        <h4 className={classes.info_story_title_second}>
                            {text_premiere}
                        </h4>}
                    <p className={classes.info_story_text}>
                        {schedule.date_text}<span>{date}</span> 
                    </p>

                    <h4>{tiket_page.ticket_title}</h4>
                    <ul className={classes.item_tickets_list}>
                        {numPlaces.map((el,i)=>{
                            
                            return <Ticket key={createKey(i)} data={el} title={film.name} premiere={premiere} date={date} time={time}/>
                        })}
                        
                    </ul>

                </li>
            )
        })



        return newArr;
    };

    return(
        <div className={classes.tiket_page_info_story} lang={lang}>
            <h3 className={classes.info_story_title}>
                {tiket_page.story_title}
            </h3>
                 
            <ul className={classes.info_story_list}>
                {showHistoryVisits(historyData)}
            </ul>
        </div>
    )
};