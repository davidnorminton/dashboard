export default function NoteOptions({
    setCurrentEditForm,
    setShowEditForm,
    deleteItem,
    note
}) {
    return (
        <div className='edit-note'>
            <i 
                class="fa-regular fa-pen-to-square edit-note-icon" 
                onClick={() => {
                    setCurrentEditForm({
                        title: note.title,
                        note: note.note,
                        timestamp: note.timestamp,
                        complete: note.complete,
                        category: note.category
                    });
                    setShowEditForm(true);
                }}
                ></i>
            <span className='delete fa-regular fa-trash-can' onClick={ () => deleteItem(note.timestamp) }></span>
        </div>
    )
}