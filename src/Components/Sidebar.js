import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

export default function Sidebar({enableMagento, enableLinux}) {

    return (
        <aside className="side-bar">

            <ul>
                <NavLink 
                    to="/"
                    className={ ( { isActive } ) => 
                        isActive ? 'active-link' : ''
                    }
                >
                    <li className="link">
                        Home
                    </li>

                </NavLink>
                <NavLink 
                    to="/about"
                    className={ ( { isActive } ) => 
                    isActive ? 'active-link' : ''
                }
                >
                    <li className="link about-link">
                        About
                    </li>
                </NavLink>
                <NavLink 
                    to="/todo"
                    className={ ( { isActive } ) => 
                    isActive ? 'active-link' : ''
                }
                >
                    <li className="link todo-link">
                        Todo
                    </li>
                </NavLink>
                <NavLink 
                    to="/bookmarks"
                    className={ ( { isActive } ) => 
                    isActive ? 'active-link' : ''
                }
                >
                    <li className="link todo-link">
                        Bookmarks
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
                            Linux
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
                            Magento
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
                        Setting
                    </li>
                </NavLink>
            </ul>

        </aside>

    );
}