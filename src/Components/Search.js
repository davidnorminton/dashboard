import { useState } from "react";

export default function Search () {


    function handleSubmit (event) {
        event.preventDefault()
        const query = event.target[0].value;
        window.location.href = "https://google.com/search?q=" + query;
    }

    return (
        <div className="web-search">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="search" 
                    className="search-input" 
                    placeholder="search google" 
                />
                <button className="search-button" type="submit">
                    <i class="fa-solid fa-magnifying-glass"></i>               
                </button>
            </form>

        </div>
    )
}