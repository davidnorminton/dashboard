import { React} from 'react';

import './css/Settings.css';

// Import components
import PageSettings from './Components/PageSettings';
import PluginSettings from './Components/PluginSettings';

export default function SettingsPage ({
    enableMagento, 
    setEnableMagento, 
    searchProvider,
    setSearchProvider,
    enableLinux,
    setEnableLinux
}) {
    return (
        <div className='page-settings'>
            <h1>Settings</h1>

            <PageSettings searchProvider={ searchProvider } setSearchProvider={ setSearchProvider } />

            <PluginSettings 
                enableMagento={ enableMagento } 
                setEnableMagento={ setEnableMagento } 
                enableLinux={ enableLinux }
                setEnableLinux={ setEnableLinux }
            />

        </div>
    )
}