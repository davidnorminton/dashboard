import { NavLink } from 'react-router-dom';

export default function Nav ({}) {
    return (
        <ul>
            <li>
                <NavLink 
                    to="/"
                    className={ ( { isActive } ) => 
                        isActive ? 'active-link' : ''
                    }
                >
                    <li className="link curl-link">
                        <span className='text'>curl</span>
                    </li>

                </NavLink>
            </li>
        </ul>
    )
}