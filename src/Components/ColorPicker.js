import '../css/ColorPicker.css';
import { useEffect } from 'react';

export default function ColorPicker ({color}) {

    useEffect( function () {
        console.log(color)
    }, [])

    return (
        <div className="color-picker">
            <h3>Choose a card colour</h3>
            <ul>
                <li className='color default' onClick={ () => color('default') }></li>
                <li className='color red' onClick={ () => color('red') }></li>
                <li className='color yellow' onClick={ () => color('yellow') }></li>
                <li className='color pink' onClick={ () => color('pink') }></li>
                <li className='color blue' onClick={ () => color('blue') }></li>
                <li className='color orange' onClick={ () => color('orange') }></li>
                <li className='color purple' onClick={ () => color('purple') }></li>
                <li className='color green' onClick={ () => color('green') }></li>
            </ul>
        </div>
    )
}