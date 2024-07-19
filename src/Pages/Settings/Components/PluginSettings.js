export default function PluginSettings({ enableMagento, setEnableMagento }) {

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
                                    onClick={ () => setEnableMagento(true) }
                                > 
                                    Enable
                                </span>
                                <span 
                                    className={ 
                                        (!enableMagento) ? 'active select-option' : 'select-option'
                                    } 
                                    onClick={ () => setEnableMagento(false) }
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