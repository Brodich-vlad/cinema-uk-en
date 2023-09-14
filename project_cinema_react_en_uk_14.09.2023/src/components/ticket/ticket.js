import classes from './ticket.module.css';

import { useContext } from 'react';
import { Context } from '../../сontext';

export default function Ticket({data, title, premiere, date, time }){
    // Отримуємо контекст.
    const { dataTextLang } = useContext(Context);

    const { lang, text_premiere, schedule } = dataTextLang;


    const {x,y,} = data;
    return (
        <li className={classes.ticket}
        lang={lang}>
        {title && <h3 className={classes.ticket_title}>{title}</h3>}
           { premiere && 
                <h4 className={classes.ticket_title_second}>
                    {text_premiere}
                </h4>
            }

           {date && time && 
                <p className={classes.ticket_text}>
                    {schedule.date_text}
                    <span>{date}</span>
                    {schedule.time_text}
                     <span> {time} : 00 </span>
                </p>
            }
            <p className={classes.ticket_text}>
                {schedule.row_text}
                <span>{y+1}</span>
                    {schedule.place_text}
                <span>{x}</span>
            </p>

        </li>
    )
}