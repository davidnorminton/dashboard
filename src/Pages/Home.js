/* global chrome */
import Time from '../Components/Time';
import Search from '../Components/Search';
import GoogleServices from '../Components/GoogleServices';
import { useEffect, useState } from 'react';


export default function Home() {

    const [showClock, setShowClock] = useState(true);
    const [clockPosition, setClockPosition] = useState("top");
    const [clockFontColor, setClockFontColor] = useState("");

    useEffect(() => {
        chrome.storage.local.get(
          [
              'setting_showClock',
              'setting_clockPosition',
              'setting_clockFontColor'
          ]
          ).then(function (result) {
              if (Object.keys(result).length > 0) {  
                  Object.keys(result).forEach(function (key, index) {
                      const state = key.replace('setting_', '');
                      console.log(state, result[key])

                      updateState(state, result[key]);
                  });
              }
          });
          console.log('home font color', clockFontColor)
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
        }
    }

    function update(setting, value) {
        updateState(setting, value);
        const obj = {}
        obj['setting_' + setting] = value;
        chrome.storage.local.set(obj).then(function () {
            console.log('Updated storage')
        });
    }


    return (
        <div className='page-home'>
            {
                (showClock && clockPosition === 'top')
                ? (
                    <Time clockFontColor={clockFontColor} />
                ) : ('')
            }

            <Search />

            <GoogleServices />

            {
                (showClock && clockPosition === 'bottom')
                ? (
                    <Time clockFontColor={clockFontColor} />
                ) : ('')
            }
        </div>
    )
}