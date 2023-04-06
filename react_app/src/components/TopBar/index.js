import './index.scss'
import {Link} from "react-router-dom";

/**
 * TopBar holds buttons for switching between Students and Classes View
 * @returns {JSX.Element}
 * @constructor
 */
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