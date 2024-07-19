import BingLogo from './BingLogo';

export default function BingSearch () {


    function handleSubmit (event) {
        event.preventDefault()
        const query = event.target[0].value;
        gotoUrl("https://www.bing.com/search?q=" + query);
    }

    function gotoUrl(url) {
        window.location.href = url;
    }

    return (
        <div>
            
            <BingLogo />

            <div className="web-search">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="search" 
                        className="search-input" 
                        placeholder="Search Bing" 
                    />
                    <button className="search-button" type="submit">
                        <i class="fa-solid fa-magnifying-glass"></i>               
                    </button>
                </form>

            </div>
        </div>

    )
}