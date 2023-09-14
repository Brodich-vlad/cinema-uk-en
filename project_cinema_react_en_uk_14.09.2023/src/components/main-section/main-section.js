import './main-section.css';
import Slider from './slider';
import { useNavigate } from "react-router-dom";

export default function MainSection() {

    let navigate = useNavigate();
    const location = (id) =>{
        navigate(`details/${id}`);
    }
    return (
        <section className='main-section'>
            <Slider callbackLocation={location}/>
        </section>
    )
}