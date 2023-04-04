import './index.scss'
import {Link} from "react-router-dom";

const TopBar = () =>{

    return(
        <div className="nav-bar">
            <nav>
                <Link className="flat-button" to="/">
                    Students
                </Link>
                <Link className="flat-button" to="/Classes">
                    Classes
                </Link>
            </nav>
        </div>
    )
}

export default TopBar;