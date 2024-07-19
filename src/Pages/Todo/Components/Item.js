export default function Item ({
    note,
    completeItem,
    showDetails,
}) {
    return (
    <div className='inner'>

        <div className='check-container'>
            {(note.complete) ? (
                <span className='complete check' onClick={() => completeItem(note.timestamp)}></span>
            ) : (
                <span className='check' onClick={() => completeItem(note.timestamp)}></span>
            )}
        </div>

        <div className='title' onClick={ () => showDetails(note.timestamp) }>

            <span className={ `${(note.complete) ? 'title-complete' : ''}` }>{note.title}</span>
        </div>
        
        {(note.note) ? (
            <div className={'note ' + note.timestamp}>{note.note}</div>
        ) : (
            <div className={'note ' + note.timestamp + ' no-note-created'}>
                No note created
            </div>
        )}
          
    </div>
    )
}