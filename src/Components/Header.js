import { useState } from "react";

export default function Header () {


    function handleSubmit (event) {
        event.preventDefault()
        const query = event.target[0].value;
        window.location.href = "https://google.com/search?q=" + query;
    }

    return (
        <div className="header" style={{left: '250px'}}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="search" 
                    className="search-input" 
                    placeholder="search google" 
                />
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>

        </div>
    )
}