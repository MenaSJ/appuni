import "./Header.css";

const Header = () => { // En el caso de que de un error al corre, cambiar la carpeta Components a components con minuscula
    return (
        <div className="header">
            <div className="opacity"></div>
            <div className="header-container">
                <h2>Nuestro Objetivo</h2>
                <p>UniExplore fue creada para Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur soluta, deleniti nesciunt dignissimos veniam autem similique eveniet iste quaerat assumenda quos distinctio, nostrum praesentium cupiditate quis impedit reprehenderit in. Culpa. </p>
            </div>
        </div> 
    )
}

export default Header
