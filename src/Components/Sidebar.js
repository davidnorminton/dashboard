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
                        <i class="fa-solid fa-house menu-icon"></i>
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
                        <i class="fa-solid fa-inbox menu-icon"></i>
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
                        <i class="fa-solid fa-list menu-icon"></i>
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
                        <i class="fa-regular fa-bookmark menu-icon"></i>
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
                            <i class="fa-brands fa-linux menu-icon"></i>
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
                            <i class="fa-brands fa-magento menu-icon"></i>
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
                        <i class="fa-solid fa-gear menu-icon"></i>
                        Settings
                    </li>
                </NavLink>
            </ul>

        </aside>

    );
}