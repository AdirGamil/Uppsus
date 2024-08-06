const { Link, NavLink } = ReactRouterDOM
import { mailService } from "../apps/mail/services/mail.service.js"
const { useState } = React


export function AppHeader() {
    const [displayNav, setDisplayNav] = useState(false)

    function toggleDisplay() {
        setDisplayNav(prevDisplay => !prevDisplay)
    }

    return <header className="app-header">
        <Link to="/">
            <img className="logo" src="./assets/img/logo.png" alt="" />
        </Link>

        <div className="app-header-right-handside">
            {/* home Link */}
            <NavLink className="home" title="Home" to="/">Home</NavLink>

            {/* abou link */}
            <NavLink className="about" title="About" to="/about">About</NavLink>

            {/* apps links */}
            <button className="apps-icon material-icons" title="Apps" onClick={toggleDisplay}>apps</button>
            <nav className={`main-nav ${displayNav ? '' : 'display-none'}`}>
                {/* mail */}
                <NavLink to="/mail" onClick={toggleDisplay}>
                    <img src="./assets/img/gmail-icon.png" alt="" />
                    <span>Gmail</span>
                </NavLink>

                {/* notes */}
                <NavLink to="/note" onClick={toggleDisplay}>
                    <img src="./assets/img/keep-icon.png" alt="" />
                    <span>Keep</span>
                </NavLink>
            </nav>

            {/* user info */}
            <button className="user-icon">{mailService.getUserName()[0]}
                <div className="user-info">
                    <div className="appsus-account">Appsus Account</div>
                    <div  className="user-name">{mailService.getUserName()}</div>
                    <div className="user-mail">{mailService.getUserMail()}</div>
                </div>

            </button>


        </div>
    </header>
}