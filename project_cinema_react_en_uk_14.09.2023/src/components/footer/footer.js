import classes from './Footer.module.css';

import { useContext } from 'react';

import { Context } from '../../сontext';

import Contacts from './contacts';

export default function Footer(){
   // Отримуємо контекст.
   const { dataTextLang } = useContext(Context);
   const { lang, footer_date } = dataTextLang;

    return(
        <footer className={classes.footer}>
            <div className={classes.footer__wrapper} >
                <p  className={classes.footer__logo} >
                    V I V
                    <span className={classes.footer__logo_a}>e</span>
                    Cinema
                </p>

                <Contacts/>
                
                <p className={classes.footer__date}
                    lang={lang}>
                   {footer_date}
                </p>
            </div>
        </footer>
    )
}