import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="side-bar lekton-regular">

            <ul>
                <li className="link home-link">
                    <span className="home-badge badge">H</span>
                    <Link to="/">ome</Link>
                </li>
                <li className="link todo-link">
                    <span className="todo-badge badge">T</span>
                    <Link to="/todo">odo</Link>
                </li>
                <li className="link magento-link">
                    <span className="magento-badge badge">M</span>
                    <Link to="/magento">agento</Link>
                </li>
            </ul>

        </aside>

    );
}