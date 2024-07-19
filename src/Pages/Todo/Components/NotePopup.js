export default function NotePopup({shouldShowForm, handleSubmit}) {
    return (
    <div className='overlay' id="overlay">
        <button className='close-form' onClick={shouldShowForm}>
            <i className='fa fa-xmark'></i>
        </button>
        <div className="add-entry-form">
            <form  onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" name="title" autoFocus />
                <textarea name="description" placeholder="Note ..."></textarea>
                <button type='submit'>
                    Add note
                </button>
            </form>
        </div>
    </div>
    )
}