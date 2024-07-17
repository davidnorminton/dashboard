/* global chrome */
import '../css/Todo.css';

import ListItems from '../Components/ListItems';
import TodoCategories from '../Components/TodoCategories';

export default function Todo () {


    return (
        <div className="page">
            <TodoCategories />
                {/* <ListItems /> */}
        </div>
    );
}