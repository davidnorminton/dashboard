import GoogleLogoImage from '../Images/google_logo.png';

export default function GoogleLogo() {

    function gotoUrl(url) {
        window.location.href = url;
    }

    return (
        <div className='google-logo'>
            <img 
                alt="Google" 
                height="92" 
                src={GoogleLogoImage} 
                width="272"
                onClick={ () => gotoUrl("https://google.com") }
            />  
        </div>
    )
}