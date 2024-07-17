/* global chrome */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ColorPicker from './ColorPicker';


export default function TodoCategories() {
    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [ pickedColor, setPickedColor ] = useState('default');
    const [notesCount, setNotesCount] = useState({})

    useEffect(() => {

        chrome.storage.local.get(['todo']).then(function (result) {
            if (Object.keys(result).length > 0) {
                result.todo.forEach((note) => {
                    if (!(note.category in notesCount)) {
                        notesCount[note.category] = 1;
                   } else {
                        notesCount[note.category] += 1;
                   }
                });
            }
        });

        chrome.storage.local.get(['list_categories']).then(function (result) {
            if (Object.keys(result).length > 0) {
               setCategories(result.list_categories);
            }
        });

    }, []);

    function updateStorage(list) {
        chrome.storage.local.set({"list_categories": list}).then(function() {
            console.log('data set in storage')
        });
    }

    function shouldShowForm () {
        if (showForm === true) {
            return setShowForm(false);
        }

        return setShowForm(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const catTitle = event.target[0].value;
        const newCategory = {
            title: catTitle.charAt(0).toUpperCase() + catTitle.slice(1),
            timestamp: Date.now(),
            count: 0,
            background: "default"
        };
        categories.push(newCategory);
        updateStorage(categories);
        setShowForm(false);
    }

    function removeNotesInCategory(title) {

        chrome.storage.local.get(['todo']).then(function (result) {
            if (Object.keys(result).length > 0) {   
                if (result.todo) {
        
                    const notesListWithRemovedItems = result.todo.filter(function(note) {               
                        if (note.category !== title) {
                            return note;
                        }
                    });
                    
                    if (notesListWithRemovedItems.length) {
                        chrome.storage.local.set({"todo": notesListWithRemovedItems}).then(function() {
                            console.log('data set in storage')
                        });                    
                    }
                }
            }
        });
    }

    function deleteItem(title) {
        const adjustList = categories.filter(function (cat) {
            if (cat.title === title) {
                return;
            }

            return cat;
        });

        setCategories(adjustList);
        updateStorage(adjustList);
        removeNotesInCategory(title)
    }

    return (
        <diiv className="page-todo-cat">

            {categories.length > 0 ? (
                <div className='category-cards'>
                    <ul>
                        {
                            categories.map((cat) => (
                                <li style={{backgroundColor: cat.background}}>
                                    <Link to={'/todo/' + cat.title}>
                                        <div className="title">{cat.title}</div>
                                        <div className='count'>
                                            { 
                                                ( notesCount[cat.title]) 
                                                ? notesCount[cat.title] === 1
                                                    ? notesCount[cat.title] + ' item' 
                                                    : notesCount[cat.title] + ' items'
                                                : '0 items'
                                            }
                                        </div>
                                    </Link>

                                    <div 
                                        className='delete fa-regular fa-trash-can' 
                                        onClick={ () => deleteItem(cat.title) }>
                                    </div>

                                </li>   
                            ))
                        }
                    </ul>
                </div>    
            ) : (
                <h1 className='no-notes'>No lists</h1>
            )}

            {showForm ? (
                <div className='overlay' id="overlay">
                    <button className='close-form' onClick={shouldShowForm}>
                        <i className='fa fa-xmark'></i>
                    </button>
                    <div className="add-entry-form">
                        <form  onSubmit={handleSubmit}>
                            <input type="text" placeholder="Category" className='capitalize' autoFocus />

                            {/* <ColorPicker colour={ pickedColor } /> */}

                            <button type='submit'>
                                Add Category
                            </button>
                        </form>
                    </div>
                </div>
                ) : ''
            }
            <button className="add-todo-entry" onClick={shouldShowForm}>
                <i className='fa fa-plus'></i>
            </button>
        </diiv>
    )
}