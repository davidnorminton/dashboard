import { useState } from "react";
import GoogleLogo from '../Components/GoogleLogo';

export default function Search () {


    function handleSubmit (event) {
        event.preventDefault()
        const query = event.target[0].value;
        gotoUrl("https://google.com/search?q=" + query);
    }

    function gotoUrl(url) {
        window.location.href = url;
    }

    return (
        <div>
            <GoogleLogo />
            <div className="web-search">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="search" 
                        className="search-input" 
                        placeholder="Search Google" 
                    />
                    <button className="search-button" type="submit">
                        <i class="fa-solid fa-magnifying-glass"></i>               
                    </button>
                </form>

            </div>
        </div>

    )
}