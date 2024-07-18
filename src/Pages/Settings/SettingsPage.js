import { React} from 'react';
import { useEffect, useState } from 'react';

import './css/Settings.css';

// Import components
import PageSettings from './Components/PageSettings';

export default function SettingsPage () {

    const [DashboardSettings, setDashboardSettings] = useState({});

    return (
        <div className='page-settings'>
            <h1>Settings</h1>

            <PageSettings settings={ DashboardSettings } />

        </div>
    )
}