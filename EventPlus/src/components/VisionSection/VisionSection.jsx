import React from 'react';
import './VisionSection.css';
import Titulo from '../Titulo/Titulo';

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className='vision__box'>
                <Titulo titleText={"Visão"} color='white' />
                <p className='vision__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor iste blanditiis provident ipsam voluptates modi facilis eos corrupti, nihil repellat beatae vero accusamus aut debitis fugiat perspiciatis id mollitia ab.</p>
            </div>
        </section>
    );
};

export default VisionSection;