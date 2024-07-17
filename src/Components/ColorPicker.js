import '../css/ColorPicker.css';

export default function ColorPicker ({element}) {
    return (
        <div className="color-picker">
            <h3>Choose a card colour</h3>
            <ul>
                <li className='color default'></li>
                <li className='color red'></li>
                <li className='color yellow'></li>
                <li className='color pink'></li>
                <li className='color blue'></li>
                <li className='color orange'></li>
                <li className='color purple'></li>
                <li className='color green'></li>
            </ul>
        </div>
    )
}