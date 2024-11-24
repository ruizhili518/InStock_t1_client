import { Link } from 'react-router-dom';
import './AddNewItem.scss';

function AddNewItem(props) {

    return (
        <Link to={props.path} className="AddNewButton">
            {props.text}
        </Link>
    )
}

export default AddNewItem;