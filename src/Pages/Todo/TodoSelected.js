import ListItems from './Components/ListItems';
import { useParams } from "react-router-dom";

export default function TodoSelected() {

    const params = useParams();
    const category = params.id;

    return (
        <div>
            <ListItems category={category} />
        </div>
    )
}