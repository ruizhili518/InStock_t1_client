import './Delete.scss';
import close from '../../assets/icons/close-24px.svg';
import axios from 'axios';

export default function DeleteModal(props) {
    const modalState = props.toggle;

    const action = props.action;

    //Delete warehouse on click Delete button
    const baseURL = import.meta.env.VITE_API_URL;
    
    const deleteWarehouse = async(warehouseId) => {
        try {
            await axios.delete(`${baseURL}/warehouses/${warehouseId}`);
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className={`deletemodal-container ${modalState ? 'deletemodal-container--open' : ''}`}>
            {modalState}
            <div className='deletemodal-active'>
                <img className='deletemodal-active__close' onClick={action} src={close}/>
                <p className='deletemodal-active__question'>Delete {props.warehousename} warehouse?</p>
                <p className='deletemodal-active__message'>Please confirm that you'd like to delete the {props.warehousename} from the list of warehouses.
                    You won't be able to undo this action.
                </p>
                <div className='deletemodal-active__button'>
                    <button className='deletemodal-active__button--cancel' onClick={action}>Cancel</button>
                    <button className='deletemodal-active__button--delete' onClick={() => {action(); deleteWarehouse(props.warehouseId);}}>Delete</button>
                </div>
            </div>
        </div>
      
    );
  }