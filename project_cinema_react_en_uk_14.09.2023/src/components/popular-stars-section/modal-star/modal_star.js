import classes from './modal_star.module.css';
import { useContext  } from 'react';
import { Context } from '../../../сontext';

import { createKey } from '../../../methods';
import star from '../../../image/svg/star-filled.svg';

export default function ModalStar({ idStar, clickModal }) {
    // Отримуємо контекст.
    const { stars, dataTextLang } = useContext(Context);
    const { lang, stars_section } = dataTextLang;

    const searchObject = (id, data) => {
        return  [...data].find(e => e.id === id*1)
    }

    // створення карточок з фільмами в яких зірка приймала участь.
    const createCardFilm =(data)=>{
        const newArr = data.map(({info,name,image,backdrop,rating,date},i)=>{
            return (
                <li key={createKey(i)} className={classes.list_item}>

                    {image ? <img className={classes.list_item_img} src={image} alt={name} /> : <div className={classes.list_item_img_alt}  ></div>}
                    <div className={classes.list_item_info}>
                        <h3 className={classes.list_item_title}>{name}</h3>
                    
                        <p className={classes.list_item_text}>{info}</p>

                        <div className={classes.list_item_rating}>
                            <img src={star} alt='star' />
                            <span>{rating}</span>
                        </div>
                        <p>{date}</p>
                    </div>    
                </li>
            )
        })
        return newArr;
    };

    // Виводим інформацію в модалку.
    const showInfoStar =(idUse, data) =>{
        const {name, image, known_for} = searchObject(idUse, data)
      
        return (
            <div className={classes.moal_details}>
                <div  className={classes.moal_details_wrapper}>
                    <h2 className={classes.moal_details_title}>{name}</h2>

                    <div className={classes.moal_details_img_wrapper} >
                        <img src={image} alt={name} />
                    </div>
        
                    
                </div>
                <ul lang={lang} className={classes.moal_details_list}>
                    <li className={classes.details_list_title} >
                        {stars_section.details_title}
                    </li>
                    {createCardFilm(known_for)}
                </ul>
            </div>
        )
    }


    return (
        <div className={classes.modal} onClick={() => {
            clickModal()
        }}>
            {showInfoStar(idStar, stars)}
            
            <div  className={classes.modal_close_btn} >&#215;</div>
        </div>
    )
};