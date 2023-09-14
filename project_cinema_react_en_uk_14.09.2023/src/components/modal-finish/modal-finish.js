import classes from './modal-finish.module.css';

import { useContext } from 'react';
import { Context } from '../../сontext';;


export default  function ModalFinish(){
   // Отримуємо контекст.
   const { dataTextLang } = useContext(Context);
   const { lang, tiket_page } = dataTextLang;

    return(
        <div className={classes.modal}>
    
            <h2 className={classes.modal_title} lang={lang}>
                {tiket_page.modal_title}
            </h2>
    
        </div>
    )
}