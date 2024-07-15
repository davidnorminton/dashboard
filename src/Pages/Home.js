import Time from '../Components/Time';
import Search from '../Components/Search';
import GoogleServices from '../Components/GoogleServices';

export default function Home() {
    return (
        <div className='page-home'>
            <Time />
            <Search />
            <GoogleServices />
        </div>
    )
}