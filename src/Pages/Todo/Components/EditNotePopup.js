export default function EditNotePopup ({
        shouldShowEditForm, 
        handleEditSubmit,
        currentEditForm
    }) {
    return (
    <div className='overlay' id="overlay">
        <button className='close-form' onClick={shouldShowEditForm}>
            <i className='fa fa-xmark'></i>
        </button>
        <div className="add-entry-form">
            <form onSubmit={handleEditSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    name="title" 
                    autoFocus 
                    onChange={(e) => currentEditForm.title = e.target.value}
                    defaultValue={ currentEditForm.title } 
                />
                <textarea name="description" placeholder="Note ..." defaultValue={ currentEditForm.note }></textarea>
                <input type="hidden" name="timestamp" value={ currentEditForm.timestamp } />
                <button type='submit'>
                    Update note
                </button>
            </form>
        </div>
    </div>
    )
}