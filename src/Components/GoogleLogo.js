import GoogleLogoImage from '../Images/google_logo.png';

export default function GoogleLogo() {
    return (
        <div className='google-logo'>
            <img 
                alt="Google" 
                height="92" 
                src={GoogleLogoImage} 
                width="272"
            />  
        </div>
    )
}