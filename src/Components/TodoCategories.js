/* global chrome */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ColorPicker from './ColorPicker';


export default function TodoCategories() {
    const [categories, setCategories] = useState([
        {
            title: "todo",
            timestamp: 12345678,
            count: 1,
            background: "default"
        },
        {
            title: "This is a really long title",
            timestamp: 12345634,
            count: 100,
            background: "green"     
        }
    ]);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        chrome.storage.local.get(['todo_categories']).then(function (result) {
            if (Object.keys(result).length > 0) {
               // setNotes(result.todo)
            }
        });
    }, []);

    function updateStorage(list) {
        chrome.storage.local.set({"todo": list}).then(function() {
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
        //Category(event.target[0].value)
        setShowForm(false);
    }

    return (
        <diiv className="page-todo-cat">

            {categories ? (
                <div className='category-cards'>
                    <ul>
                        {
                            categories.map((cat) => (
                                <Link to={'/todo/' + cat.title}>
                                    <li style={{backgroundColor: cat.background}}>
                                        <div className="title">{cat.title}</div>
                                        <div className='count'>{ 
                                            (cat.count === 1) ? cat.count + ' item' : cat.count +' items'
                                        }</div>
                                    </li>   
                                </Link>
                            ))
                        }
                    </ul>
                </div>    
            ) : (
                <h1>No categories created</h1>
            )}

            {showForm ? (
                <div className='overlay' id="overlay">
                    <button className='close-form' onClick={shouldShowForm}>
                        <i className='fa fa-xmark'></i>
                    </button>
                    <div className="add-entry-form">
                        <form  onSubmit={handleSubmit}>
                            <input type="text" placeholder="Category" />

                            <ColorPicker />

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