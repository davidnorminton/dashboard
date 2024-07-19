import { useState, useEffect } from "react";

export default function IpAddress() {

    const [ip, setIp] = useState("");

    function getIPFromAmazon() {
        fetch("https://checkip.amazonaws.com/").then(res => res.text())
        .then(data => setIp(data));
    }

    useEffect(function () {
        getIPFromAmazon()
    }, [])

    return (
        <div className="ip-address">
            <h2>Remote IP address</h2>
            <span>{ip}</span>
        </div>
    )
} 