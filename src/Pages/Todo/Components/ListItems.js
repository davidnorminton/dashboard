/* global chrome */
import { useState, useEffect } from 'react';

export default function ListItems ({category}) {

    const [allNotes, setAllNotes] = useState([]);
    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);    
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentEditForm, setCurrentEditForm] = useState({});

    useEffect(() => {
        chrome.storage.local.get(['todo']).then(function (result) {
            if (Object.keys(result).length > 0) {   
                if (result.todo) {
                    setAllNotes(result.todo);
        
                    const matchedNotes = result.todo.filter(function(note) {               
                        if (note.category === category && typeof note === 'object') {
                            return note;
                        }

                        return false;
                    });
                    
                    if (matchedNotes.length) {
                        setNotes(matchedNotes)
                    }
                }
            }
        });

    }, [category]);

    function addNote (title, note) {
        if (!title) return;

        const timestamp = Date.now();
        const notesObject = {
            title: title.charAt(0).toUpperCase() + title.slice(1),
            note: note,
            timestamp: timestamp,
            complete: false,
            category: category
        }; 

        notes.push(notesObject);
        allNotes.push(notesObject);
        //setNotes(mergeList)
        updateStorage(allNotes);
    }

    function shouldShowForm () {
        if (showForm === true) {
            return setShowForm(false);
        }

        return setShowForm(true);
    }

    function shouldShowEditForm () {
        if (showEditForm === true) {
            return setShowEditForm(false);
        }

        return setShowEditForm(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        addNote(event.target[0].value, event.target[1].value)
        setShowForm(false);
    }

    function handleEditSubmit(event) {

        event.preventDefault();

        const title = event.target[0].value;
        const desc = event.target[1].value;
        const timestamp = event.target[2].value;
        const updatedNotes = notes.map(function (note) {
            if (parseInt(note.timestamp) === parseInt(timestamp)) {
                note.title = title;
                note.note = desc;
            }

            return note;
        });

        setNotes(updatedNotes);
        const updatedAllNotes = allNotes.map(function (note) {
            if (note.timestamp === timestamp) {
                note.title = title;
                note.note = note;
            }

            return note;
        });

        setAllNotes(updatedAllNotes);

        setShowEditForm(false);
    }

    function completeItem (timestamp) {
        const updatedNotes = notes.map(function(note) {
            if (parseInt(note.timestamp) === parseInt(timestamp)) {

                var temp = Object.assign({}, note);
                if (temp.complete === true) {
                    temp.complete = false;
                } else {
                    temp.complete = true
                }

                return temp;
            }

            return note;
        });

        const updatedAllNotes = allNotes.map(function(note) {
            if (note.timestamp === timestamp) {
                if (note.complete === true) {
                    note.complete = false;
                } else {
                    note.complete = true;
                }
            }

            return note;
        });

        setNotes(updatedNotes);
        updateStorage(updatedAllNotes);
    }

    function showDetails (timestamp) {
        const elem = document.getElementsByClassName(timestamp);
        if (elem[0]) {
            if (elem[0].style.display === "block") {
                elem[0].style.display = "none";
            } else {
                elem[0].style.display = "block";
            }
        }
    }

    function deleteItem(timestamp) {
        const adjustList = notes.filter(function (note) {
            if (note.timestamp === timestamp) {
                return false;
            }

            return note;
        });

        const adjustMainList = allNotes.filter(function (note) {
            if (note.timestamp === timestamp) {
                return false;
            }

            return note;
        });

        setNotes(adjustList);
        updateStorage(adjustMainList);
    }

    function updateStorage(list) {
        chrome.storage.local.set({"todo": list}).then(function() {
            console.log('data set in storage')
        });
    }

    return (
        <div className="page-todo">
            <h1 className='page-title'>
                {category}
            </h1>
            {notes.length > 0 ? (
               <ul className='todo-list'>
                    {
                        notes.map(
                            (note) => (
                                <li className='list-item'>
                                    <div className='inner'>
                                        <div className='check-container'>
                                        {
                                            (note.complete) ? (
                                                <span className='complete check' onClick={() => completeItem(note.timestamp)}></span>
                                            ) : (
                                                <span className='check' onClick={() => completeItem(note.timestamp)}></span>
                                            )
                                        }
                                        </div>

                                        <div className='title' onClick={ () => showDetails(note.timestamp) }>

                                            <span className={ `${(note.complete) ? 'title-complete' : ''}` }>{note.title}</span>
                                        </div>
                                        {
                                            (note.note) ? (
                                                <div className={'note ' + note.timestamp}>{note.note}</div>
                                            ) : (
                                                <div className={'note ' + note.timestamp + ' no-note-created'}>
                                                    No note created
                                                </div>
                                            )
                                        }
                                          
                                    </div>
                                    <i 
                                        class="fa-regular fa-pen-to-square edit-note" 
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
                                </li>
                            )
                        )
                    }
               </ul>
            ) : (
                <h1 className='no-notes'>No notes</h1>
            )}

            {showForm ? (
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
                ) : ''
            }

            {showEditForm ? (
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
                ) : ''
            }   

            <button className="add-todo-entry" onClick={shouldShowForm}>
                <i className='fa fa-plus'></i>
            </button>
        </div>
    );
}