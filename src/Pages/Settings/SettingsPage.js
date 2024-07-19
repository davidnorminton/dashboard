import { React} from 'react';

import './css/Settings.css';

// Import components
import PageSettings from './Components/PageSettings';
import PluginSettings from './Components/PluginSettings';

export default function SettingsPage ({enableMagento, setEnableMagento}) {

    return (
        <div className='page-settings'>
            <h1>Settings</h1>

            <PageSettings />

            <PluginSettings enableMagento={ enableMagento } setEnableMagento={ setEnableMagento } />

        </div>
    )
}