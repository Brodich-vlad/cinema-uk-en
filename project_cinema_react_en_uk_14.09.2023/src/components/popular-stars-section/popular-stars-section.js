import classes from './popularStarsSection.module.css';

import { useState, useContext  } from 'react';

import ModalStar from './modal-star';
import Poster  from '../poster';

import { Context } from '../../сontext';

export default function PopularStarsSection(){
    // Отримуємо контекст.
    const { stars, dataTextLang } = useContext(Context);

    const { lang, stars_section } = dataTextLang;

    // Стан модалки.
    const [openModal, setOpenModal] = useState(false)
    const [infoModal, setInfoModal] = useState(null)

    const closeModal = () => {
        if (openModal ) {
            setOpenModal(false)
            setInfoModal(null) 
       } 
    }

    const showModal = (id) => {
        setOpenModal(true)
        setInfoModal(id)

    }

    return (
        <section className={classes.stars_section}>
            <h2 className={classes.stars_section__title}
                lang={lang}>
                    {stars_section.title}
            </h2>
            <ul className={classes.stars_section__list}>
                {stars && <Poster dataArr={ stars } callbackLocation={showModal}/>}
            </ul>
           {openModal && <ModalStar clickModal={closeModal} idStar={infoModal}/>}
        </section>
    )
}