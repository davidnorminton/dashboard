/* global chrome */
import { useState, useEffect } from 'react';

// Components
import EditNotePopup from './EditNotePopup';
import NotePopup from './NotePopup';
import Item from './Item';
import NoteOptions from './NoteOptions';

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
                                    <Item
                                        note={ note }
                                        completeItem={ completeItem }
                                        showDetails={ showDetails }
                                    />
                                    <NoteOptions
                                        setCurrentEditForm={ setCurrentEditForm }
                                        setShowEditForm={ setShowEditForm }
                                        deleteItem={ deleteItem }
                                        note={ note }
                                    />
                                </li>
                            )
                        )
                    }
               </ul>
            ) : (
                <h1 className='no-notes'>No notes</h1>
            )}

            {showForm ? (

                <NotePopup shouldShowForm={ shouldShowForm } handleSubmit={ handleSubmit } />

            ) : ''}

            {showEditForm ? (

                <EditNotePopup 
                    shouldShowEditForm={ shouldShowEditForm }
                    handleEditSubmit={ handleEditSubmit }
                    currentEditForm={ currentEditForm }
                />

            ) : ''}   

            <button className="add-todo-entry" onClick={shouldShowForm}>
                <i className='fa fa-plus'></i>
            </button>
        </div>
    );
}