import Time from '../Components/Time';
import Search from '../Components/Search';
import GoogleServices from '../Components/GoogleServices';
import GoogleLogo from '../Components/GoogleLogo';

export default function Home() {
    return (
        <div className='page-home'>
            <Time />
            <GoogleLogo />
            <Search />
            <GoogleServices />
        </div>
    )
}