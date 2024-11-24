import arrowback from '../../assets/icons/arrow_back-24px.svg';
import editwhite from '../../assets/icons/edit-white-24px.svg';
import { Link } from 'react-router-dom';
import './WarehouseDetails.scss'

function WarehouseInfo(props) {
    const {
        id,
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email
    } = props.warehouse

    return (
        <section className='warehouse-details'>
            <section className='warehouse-details__heading'>
                <div className='warehouse-details__heading-1'>
                    <Link to="/">
                        <img src={arrowback}/>
                    </Link>
                    <p>{warehouse_name}</p>
                </div>
                <div className='warehouse-details__heading-2'>
                    <Link to="/edit-warehouse">
                        <img src={editwhite}/>
                    </Link>
                    <p>Edit</p>
                </div>
            </section>
            <section className='warehouse-details__info'>
                <div className='warehouse-details__info-1'>
                    <p className='warehouse-details--heading'>WAREHOUSE ADDRESS:</p>
                    <p>{address},&nbsp;</p>
                    <p>{`${city}, ${country}`}</p>
                </div>
                <div className='warehouse-details__info-2'>
                    <div>
                        <p className='warehouse-details--heading'>CONTACT NAME</p>
                        <p>{contact_name},</p>
                        <p>{contact_position}</p>
                    </div>
                    <div>
                        <p className='warehouse-details--heading'>CONTACT INFORMATION</p>
                        <p>{contact_phone},</p>
                        <p>{contact_email}</p>
                    </div>
                </div>
            </section>
            <p>This is inventory list</p>
        </section>
    )
}

export default WarehouseInfo;