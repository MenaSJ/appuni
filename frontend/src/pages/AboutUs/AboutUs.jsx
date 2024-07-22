import "./AboutUs.css";

const AboutUs = () => {
    return (
        <div className="acerca main-container">
            <div className="about-us-header">
                <h1>Acerca de Nosotros</h1>
                <p>Ayudando a los estudiantes de bachillerato a encontrar su camino universitario.</p>
            </div>
            <div className="about-us-content">
                <section className="mission">
                    <h2>Nuestra Misión</h2>
                    <p>Facilitar el acceso a la información sobre universidades y opciones educativas para estudiantes de bachillerato, ayudándoles a tomar decisiones informadas sobre su futuro académico.</p>
                </section>
                <section className="vision">
                    <h2>Nuestra Visión</h2>
                    <p>Ser la plataforma de referencia para estudiantes de bachillerato que buscan información confiable y completa sobre universidades, contribuyendo a su éxito académico y profesional.</p>
                </section>
                <section className="values">
                    <h2>Nuestros Valores</h2>
                    <ul>
                        <li>Accesibilidad</li>
                        <li>Transparencia</li>
                        <li>Apoyo</li>
                        <li>Innovación</li>
                        <li>Compromiso</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default AboutUs