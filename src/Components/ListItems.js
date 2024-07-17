/* global chrome */
import { useState, useEffect } from 'react';

export default function ListItems ({category}) {

    const [allNotes, setAllNotes] = useState([]);
    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        chrome.storage.local.get(['todo']).then(function (result) {
            if (Object.keys(result).length > 0) {   
                if (result.todo) {
                    setAllNotes(result.todo);
        
                    const matchedNotes = result.todo.filter(function(note) {               
                        if (note.category === category && typeof note === 'object') {
                            return note;
                        }
                    });
                    
                    if (matchedNotes.length) {
                        setNotes(matchedNotes)
                    }
                }
            }
        });

    }, []);

    function addNote (title, note) {
        if (!title) return;

        const timestamp = Date.now();
        const notesObject = {
            title: title,
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

    function handleSubmit(event) {
        event.preventDefault();
        addNote(event.target[0].value, event.target[1].value)
        setShowForm(false);
    }

    function completeItem (timestamp) {
        const updatedNotes = notes.map(function(note) {
            if (note.timestamp === timestamp) {
                if (note.complete) {
                    note.complete = false;
                } else {
                    note.complete = true;
                }
            }

            return note;
        });

        setNotes(updatedNotes);
        updateStorage(updatedNotes);
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
                return;
            }

            return note;
        });

        setNotes(adjustList);
        updateStorage(adjustList);
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
                                        <div className='title' onClick={ () => showDetails(note.timestamp) }>
                                        {
                                            (note.complete) ? (
                                                <span className='complete check' onClick={() => completeItem(note.timestamp)}></span>
                                            ) : (
                                                <span className='check' onClick={() => completeItem(note.timestamp)}></span>
                                            )
                                        }
                                            <span className={ `${(note.complete) ? 'title-complete' : ''}` }>{note.title}</span>
                                            <span className='delete fa-regular fa-trash-can' onClick={ () => deleteItem(note.timestamp) }></span>
                                        </div>
                                                 
                                        <div className={'note ' + note.timestamp}>{note.note}</div>
                                          
                                    </div>
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
                            <input type="text" placeholder="Title" name="title" />
                            <textarea name="description" placeholder="Note ..."></textarea>
                            <button type='submit'>
                                Add note
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