import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>Acerca de Nosotros</h1>
            <section className="mission">
                <h2>Nuestra Misión</h2>
                <p>Somos UniExplore. Nos dedicamos a proporcionar información de universidades para enfrentar los desafíos del mundo moderno y poder ayudarte a encontrar la universidad de tus sueños al igual que tu vocación. Nuestra misión es empoderar a cada individuo para alcanzar su máximo potencial y contribuir positivamente a la sociedad.</p>
            </section>
            <section className="who-we-are">
                <h2>¿Quiénes Somos?</h2>
                <p>Somos una institución comprometida con la excelencia y el desarrollo integral de nuestros usuarios. Con una rica historia y una trayectoria de éxito, ofrecemos una amplia gama de universidades diseñadas para satisfacer las diversas necesidades y aspiraciones de nuestros estudiantes.</p>
            </section>
            <section className="find-university">
                <h2>Encuentra la Universidad de Tus Sueños</h2>
                <p>Entendemos que elegir la universidad adecuada es una decisión crucial en la vida de cualquier estudiante. Por eso, estamos aquí para ayudarte a encontrar la universidad de tus sueños. Ofrecemos orientación personalizada y recursos para ayudarte a tomar una decisión informada que se alinee con tus intereses, metas y valores.</p>
            </section>
            <section className="values">
                <h2>Nuestros Valores</h2>
                <ul>
                    <li><strong>Excelencia Académica:</strong> Nos esforzamos por mantener los más altos estándares en todos nuestros programas educativos.</li>
                    <li><strong>Innovación:</strong> Fomentamos la creatividad y la innovación en todos los aspectos de la vida universitaria.</li>
                    <li><strong>Inclusión y Diversidad:</strong> Valoramos la diversidad y promovemos un ambiente inclusivo donde todos se sientan bienvenidos y respetados.</li>
                    <li><strong>Compromiso con la Comunidad:</strong> Nos dedicamos a servir y contribuir positivamente a nuestra comunidad local y global.</li>
                </ul>
            </section>
            <section className="contact">
                <h2>Contacto</h2>
                <p>Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros.</p>
                <p><strong>Correo Electrónico:</strong> uniexplore@gmail.com</p>
                <p><strong>Teléfono:</strong> 222-364-58-90</p>
                <p>¡Estamos aquí para ayudarte a encontrar la universidad de tus sueños!</p>
            </section>
        </div>
    );
};

export default AboutUs;
