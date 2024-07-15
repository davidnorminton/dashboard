/* global chrome */
import '../css/Todo.css';
import { useState, useEffect } from 'react';

export default function Todo () {

    const [notes, setNotes] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // const storedNotes = chrome.storage.local.get('todo_list');
        // console.log('storage')
        // console.log(storedNotes)
        // if (storedNotes) {
        //     setNotes(storedNotes);
        // }
    });

    function shouldShowForm () {
        if (showForm === true) {
            return setShowForm(false);
        }

        return setShowForm(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target[0].value);
        console.log(event.target[1].value)
        setShowForm(false);
    }

    return (
        <div className="page-todo">

            {notes ? (
                <h1>Have notes</h1>
            ) : (
                <h1>No notes</h1>
            )}

            {showForm ? (
            <div className='overlay' id="overlay">
                <button className='close-form' onClick={shouldShowForm}>
                    X
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

            <h1>Todo</h1>
            <button className="add-todo-entry" onClick={shouldShowForm}>
                +
            </button>
        </div>
    );
}