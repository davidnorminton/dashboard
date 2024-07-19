/* global chrome */
import { React, useEffect, useState } from "react";

export default function PageSettings () {

    const colors = [
        "#434357",
        "#fff",
        "#6e6969",
        "#2fb534",
        "orange",
        "yellow",
        "blue"
    ];

    const [showClock, setShowClock] = useState(true);
    const [clockPosition, setClockPosition] = useState("top");
    const [clockFontColor, setClockFontColor] = useState("#434357");


    useEffect(function () {
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
                    updateState(state, result[key]);
                });
            }
        });

    }, []);

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
            default:
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
        <section className="page-settings-about">
            <h2>Home page settings</h2>
            <div className="adjust-settings">
                <ul className="settings-list">
                    <li>
                        <ul>
                            <li className="settings">
                                <span>Show Clock</span>
                            </li>
                            <li>
                                <span 
                                    className={ 
                                        (showClock) ? 'active select-option' : 'select-option'
                                    } 
                                    onClick={ () => update('showClock', true) }
                                > 
                                    Yes 
                                </span>
                                <span 
                                    className={ 
                                        (!showClock) ? 'active select-option' : 'select-option'
                                    } 
                                    onClick={ () => update('showClock', false) }
                                > 
                                    No 
                                </span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li className="settings">
                                <span>Clock Position</span>
                            </li>
                            <li>
                            <span 
                                    className={ 
                                        (clockPosition === "top") ? 'active select-option' : 'select-option'
                                    } 
                                    onClick={ () => update("clockPosition" , "top") }
                                > 
                                    Top
                                </span>
                                <span 
                                    className={ 
                                        (clockPosition === "bottom") ? 'active select-option' : 'select-option'
                                    } 
                                    onClick={ () => update("clockPosition" , "bottom") }
                                > 
                                    Bottom
                                </span>                            
                            </li>
                        </ul>
                    </li>
                    <li className="last-item">
                        <ul>
                            <li className="settings">
                                <span>Clock font colour</span>
                            </li>
                            <li>

                                {colors.map( (color) => (
                                    <span 
                                        className={ 
                                            (clockFontColor === color) 
                                            ? 'active color-select'
                                            : 'color-select'
                                        } 
                                        style={
                                            { backgroundColor: color }
                                        }

                                        onClick={ () => update("clockFontColor", color) }
                                    > 
                                </span>
    
                                ))}

                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
    )
}