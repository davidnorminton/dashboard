import '../css/GoogleServices.css';

export default function GoogleServices () {

    function gotoUrl(url) {
        window.location.href = url;
    }

    return (
        <div className="google-services">
            <ul>
                <li onClick={ () => gotoUrl("https://mail.google.com/mail/&ogbl") }>
                    <div className='google-icon gmail'></div>
                    <div>Gmail</div>
                </li>
                <li onClick={ () => gotoUrl("https://photos.google.com/?authuser=0") }>
                    <div className='google-icon photos'></div>
                    <div>Photos</div>
                </li>
                <li onClick={ () => gotoUrl("https://maps.google.com/?authuser=0") }>
                    <div className='google-icon maps'></div>
                    <div>Maps</div>
                </li>
                <li onClick={ () => gotoUrl("https://translate.google.com/?authuser=0") }>
                    <div className='google-icon translate'></div>
                    <div>Translate</div>
                </li>
                <li onClick={ () => gotoUrl("https://www.youtube.com/?authuser=0") }>
                    <div className='google-icon youtube'></div>
                    <div>Youtube</div>
                </li>
                <li onClick={ () => gotoUrl("https://gemini.google.com/?authuser=0") }>
                    <div className='google-icon gemini'></div>
                    <div>Gemini</div>
                </li>
                <li onClick={ () => gotoUrl("https://calendar.google.com/calendar?authuser=0") }>
                    <div className='google-icon calendar'></div>
                    <div>Calendar</div>
                </li>
            </ul>
        </div>
    )
}

