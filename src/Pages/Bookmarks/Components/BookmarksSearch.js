import { useNavigate } from "react-router-dom"

export default function BookmarksSearch() {

    const navigate = useNavigate();

    function handleSubmit (event) {
        event.preventDefault()
        navigate('/bookmarks/' + event.target[0].value);
    }

    return (
        <div className="bookmarks-search">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search bookmarks" />
                <button type="submit" className="submit">
                    <i className="fa-solid fa-magnifying-glass bookmark-search-icon" />
                </button>
            </form>
        </div>
    )
}