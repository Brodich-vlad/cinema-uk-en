import './header.css';

import { useMatch } from 'react-router';
import { useContext } from 'react';
import { Context } from '../../сontext';
import { Link } from 'react-router-dom';
import globe_white from "../../image/svg/globe_white.svg";


export default function Header() {
    // Якщо не головна сторінка приховати поле пошуку.  
    const match = useMatch('/');

    // Отримуємо контекст.
    const {
        search,
        callbackSetSearchInput,
        lang,
        callbackSetLang,
        minusPage,
    } = useContext(Context);

    // Стан строки інпута.
    const searchInput = (elem) => {
        callbackSetSearchInput(elem);
        minusPage(true);
    };

    const cleanInput = () => {
        callbackSetSearchInput('');
        minusPage(true);
    };  
    


    return (
        <header className='header'>
            <div className='header__wrapper'>
                <Link to={'/'}
                onClick={()=>{
                    minusPage(true)
                    cleanInput()
                }}
                className='header__title_link'>
                    <h1 className='header__title'>
                        <span className='logo__yllow'>V</span>
                        <span className='logo__blue'>I</span>
                        <span className='logo__green'>V</span><span className='header__title-logo'>e</span> Cinema
                    </h1>
                </Link>
              
                {match ?
                    <div className='header__search'>
                        <input value={search}
                            onChange={(value) => {
                                searchInput(value.target.value)
                            }}
                            className='header__search_input'
                            type='text' />

                        {search !== '' &&
                            <span onClick={cleanInput} className='header__close_btn'>&#215;</span>
                        }
                    
                        <span className='header__search_btn' type='button'></span>
                    </div> :
                    null
                }
                <div className='wrapper_btn-lang'>
                    <button
                        onClick={callbackSetLang}
                        className="btn-lang"
                        type="button">
                            <img src={ globe_white} alt="globe"/><span className="btn-lang_txt">{lang === 'uk-Uk' ? 'Uk' : 'En'}</span>
                            <span className="btn-lang_txt-second">{lang === 'uk-Uk' ? 'En' : 'Uk'}</span>
                    </button>
                </div>
         
            </div>

        </header>
    )
};
