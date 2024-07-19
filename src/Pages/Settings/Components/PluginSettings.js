/* global chrome */
import { React } from "react";


export default function PluginSettings({ 
    enableMagento, 
    setEnableMagento,
    enableLinux,
    setEnableLinux
}) {

    function setShowMagentoPlugin (value) {
        const obj = {}
        obj['setting_magento'] = value;
        chrome.storage.local.set(obj).then(function () {
            console.log('Updated storage')
        });

        setEnableMagento(value);
    }

    function setShowLinuxPlugin (value) {
        const obj = {}
        obj['setting_linux'] = value;
        chrome.storage.local.set(obj).then(function () {
            console.log('Updated storage')
        });

        setEnableLinux(value);
    }

    return (
        <section className="page-settings-plugin">
            <h2>Plugins</h2>
            <div className="adjust-settings">
                <ul className="settings-list">
                    <li>
                        <ul>
                            <li className="settings">
                                <span>Magento</span>
                            </li>
                            <li>
                                <span 
                                    className={ 
                                        (enableMagento) ? 'active select-option' : 'select-option'
                                    } 
                                    onClick={ () => setShowMagentoPlugin(true) }
                                > 
                                    Enable
                                </span>
                                <span 
                                    className={ 
                                        (!enableMagento) ? 'active select-option' : 'select-option'
                                    } 
                                    onClick={ () => setShowMagentoPlugin(false) }
                                > 
                                    Disable
                                </span>
                            </li>
                        </ul>         

                        <ul>
                            <li className="settings">
                                <span>Linux</span>
                            </li>
                            <li>
                                <span 
                                    className={ 
                                        (enableLinux) ? 'active select-option' : 'select-option'
                                    } 
                                    onClick={ () => setShowLinuxPlugin(true) }
                                > 
                                    Enable
                                </span>
                                <span 
                                    className={ 
                                        (!enableLinux) ? 'active select-option' : 'select-option'
                                    } 
                                    onClick={ () => setShowLinuxPlugin(false) }
                                > 
                                    Disable
                                </span>
                            </li>
                        </ul>                 
                    </li>
                </ul>
            </div>
        </section>
    )
}