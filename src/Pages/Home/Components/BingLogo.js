import BingLogoImage from '../Images/bing_logo.png';

export default function BingLogo() {

    function gotoUrl(url) {
        window.location.href = url;
    }

    return (
        <div className='google-logo'>
            <img 
                alt="Google" 
                height="92" 
                src={BingLogoImage} 
                width="272"
                onClick={ () => gotoUrl("https://bing.com") }
            />  
        </div>
    )
}