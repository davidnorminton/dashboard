/* global chrome */
import { React } from "react";


export default function PluginSettings({ enableMagento, setEnableMagento }) {

    function setShowMagentoPlugin (value) {
        //setEnableMagento(value);
        const obj = {}
        obj['setting_magento'] = value;
        chrome.storage.local.set(obj).then(function () {
            console.log('Updated storage')
        });

        setEnableMagento(value);
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
                    </li>
                </ul>
            </div>
        </section>
    )
}