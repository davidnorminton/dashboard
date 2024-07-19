import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

export default function Sidebar({enableMagento, enableLinux}) {

    return (
        <aside className="side-bar lekton-regular">

            <ul>
                <NavLink 
                    to="/"
                    className={ ( { isActive } ) => 
                        isActive ? 'active-link' : ''
                    }
                >
                    <li className="link home-link">
                        <span className="home-badge badge">H</span>
                        <span className='text'>ome</span>
                    </li>

                </NavLink>
                <NavLink 
                    to="/about"
                    className={ ( { isActive } ) => 
                    isActive ? 'active-link' : ''
                }
                >
                    <li className="link about-link">
                        <span className="about-badge badge">A</span>
                        <span className='text'>bout</span>
                    </li>
                </NavLink>
                <NavLink 
                    to="/todo"
                    className={ ( { isActive } ) => 
                    isActive ? 'active-link' : ''
                }
                >
                    <li className="link todo-link">
                        <span className="todo-badge badge">T</span>
                        <span className='text'>odo</span>
                    </li>
                </NavLink>
                {
                    (enableLinux) ? (
                    <NavLink 
                        to="/linux"
                        className={ ( { isActive } ) => 
                            isActive ? 'active-link' : 'setting-linux'
                        }
                    >
                            <li className="link linux-link">
                            <span className="linux-badge badge">L</span>
                            <span className='text'>inux</span>
                        </li>
                    </NavLink>
                    ) : (<div>{enableLinux}</div>)
                }
                {
                    (enableMagento) ? (
                    <NavLink 
                        to="/magento"
                        className={ ( { isActive } ) => 
                            isActive ? 'active-link' : 'setting-magento'
                        }
                    >
                            <li className="link magento-link">
                            <span className="magento-badge badge">M</span>
                            <span className='text'>agento</span>
                        </li>
                    </NavLink>
                    ) : ('')
                }

                <NavLink 
                    to="/settings"
                    className={ ( { isActive } ) => 
                        isActive ? 'active-link' : ''
                    }
                >
                        <li className="link settings-link">
                        <span className="settings-badge badge">S</span>
                        <span className='text'>ettings</span>
                    </li>
                </NavLink>
            </ul>

        </aside>

    );
}