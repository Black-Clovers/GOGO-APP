import './header.css';

const Header = (props) => {
    return (
        <div className="top_navbar">
            <div className="hamburger">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
            </div>
            <div className="top_menu d-flex justify-content-around">
                <div className="logo col-6 ms-lg-5 ps-lg-5 ms-sm-0 ps-sm-0 ms-md-0 ps-md-0">
                    {/*<img src={logo} alt=""/>*/}
                </div>
                <ul className="mb-0 col-6 d-flex justify-content-end">
                    <li className="mt-1">
                        <p className="d-inline me-2"><i className="fa-solid fa-arrow-left-long"></i></p>
                        <p className="d-inline ms-2 me-2 profileName">Madhusha</p>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-user"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;