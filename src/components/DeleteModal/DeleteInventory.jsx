import axios from 'axios';
import close from '../../assets/icons/close-24px.svg';
import './Delete.scss';

export default function DeleteModal(props) {
    const modalState = props.toggle;

    const action = props.action;

    const baseURL = import.meta.env.VITE_API_URL;
    
    const deleteInventory = async(inventoryId) => {
        try {
            await axios.delete(`${baseURL}/inventories/${inventoryId}`);
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className={`deletemodal-container ${modalState ? 'deletemodal-container--open' : ''}`}>
            {modalState}
            <div className='deletemodal-active'>
                <img className='deletemodal-active__close' onClick={action} src={close}/>
                <p className='deletemodal-active__question'>Delete {props.inventoryname} inventory item?</p>
                <p className='deletemodal-active__message'>Please confirm that you'd like to delete {props.inventoryname} from the inventory list.
                    You won't be able to undo this action.
                </p>
                <div className='deletemodal-active__button'>
                    <button className='deletemodal-active__button--cancel' onClick={action}>Cancel</button>
                    <button className='deletemodal-active__button--delete' onClick={() => {action(); deleteInventory(props.inventoryId);}}>Delete</button>
                </div>
            </div>
        </div>
      
    );
  }