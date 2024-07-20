/* global chrome */
import { useEffect, useState } from 'react';

import './css/Home.css';

import Time from './Components/Time';
import GoogleSearch from './Components/GoogleSearch';
import GoogleServices from './Components/GoogleServices';
import BingSearch from './Components/BingSearch';

export default function Home() {

    const [showClock, setShowClock] = useState(true);
    const [clockPosition, setClockPosition] = useState("top");
    const [clockFontColor, setClockFontColor] = useState("");
    const [searchProvider, setSearchProvider] = useState("");


    useEffect(() => {
        chrome.storage.local.get(
          [
              'setting_showClock',
              'setting_clockPosition',
              'setting_clockFontColor',
              'setting_searchProvider'
          ]
          ).then(function (result) {
              if (Object.keys(result).length > 0) {  
                  Object.keys(result).forEach(function (key, index) {
                      const state = key.replace('setting_', '');
                      updateState(state, result[key]);
                  });
              }
          });
    }, [])

    function updateState(setting, value) {
        switch(setting) {
            case 'showClock':
                setShowClock(value);
                break;
            case "clockPosition":
                setClockPosition(value);
                break;
            case "clockFontColor":
                setClockFontColor(value);
                break;
            case "searchProvider":
                setSearchProvider(value);
                break;
            default:
                break;
        }
    }

    return (
        <div className='page-home'>
            {
                (showClock && clockPosition === 'top')
                ? (
                    <Time clockFontColor={clockFontColor} />
                ) : ('')
            }

            {
                (searchProvider === 'google' || !(searchProvider.length))
                ? (
                    <div>
                        <GoogleSearch />
                        <GoogleServices />
                    </div>
                ) : ("")
            }
            {
                (searchProvider === 'bing')
                ? (
                    <div>
                        <BingSearch />
                    </div>
                ) : ("")
            }


            {
                (showClock && clockPosition === 'bottom')
                ? (

                    <Time clockFontColor={clockFontColor} />
                    
                ) : ('')
            }
        </div>
    )
}