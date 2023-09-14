import classes from './pagination.module.css';
import { useContext } from 'react';
import { Context } from '../../сontext';

export default function Pagination(){
     // Отримуємо контекст.
    const {
        films,
        filmsNumPage,
        minusPage,
        addPage,
        dataTextLang
    } = useContext(Context);

    const { lang, movies_section } = dataTextLang;

    return (
        <ul className={classes.pagin_list} lang={lang}>
            <li className={classes.list_item}>
                <button className={classes.item_btn}
                    disabled={
                        filmsNumPage === 1 ?
                        true:
                        false 
                    } 
                    type='button'
                    onClick={()=>{minusPage()}}>
                    <span>&#10094; </span>    
                    <span className={classes.btn_text}>{movies_section.prev_btn}</span>
                </button>
              
            </li>
 
            <li className={classes.list_item}>
                <span className={classes.item}>
                    {movies_section.page}
                    {filmsNumPage}
                </span>
                <button className={classes.item_btn1} 
                    type='button'
                    disabled={
                        films.length === 20 && filmsNumPage < 30 ?
                        false:
                        true 
                    } 
                    onClick={addPage}>
                        <span className={classes.btn_text}>{movies_section.next_btn}</span>
                        <span> &#10095;</span>  
                </button>
            </li>
        </ul>
    )
};