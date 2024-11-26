import { Link } from "react-router-dom";
import chevron from '../../assets/icons/chevron_right-24px.svg';
import delete_icon from '../../assets/icons/delete_outline-24px.svg'; 
import edit_icon from '../../assets/icons/edit-24px.svg'; 
import './WarehouseListItem.scss'


export function MobileListItem(props) {
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
    } = props.warehouse;

    return(
        <ul className="mobile-warehouse">
            <li className="mobile-warehouse__item">
                <p className="mobile-warehouse__item--title">WAREHOUSE</p>
                <Link className="mobile-warehouse__item--link" to={`/warehouses/${id}`}>
                    {warehouse_name}
                    <img src={chevron}/>
                </Link>
            </li>
            <li className="mobile-warehouse__item">
                <p className="mobile-warehouse__item--title">CONTACT NAME</p>
                <p>{contact_name}</p>
            </li>
            <li className="mobile-warehouse__item">
                <p className="mobile-warehouse__item--title">ADDRESS</p>
                <p>{`${address}, ${city}, ${country}`}</p>
            </li>
            <li className="mobile-warehouse__item">
                <p className="mobile-warehouse__item--title">CONTACT INFORMATION</p>
                <p>{contact_phone}</p>
                <p>{contact_email}</p>
            </li>
            <li className="mobile-warehouse__item">
                <img src={delete_icon} />
                <Link to="/edit-warehouse">
                    <img src={edit_icon} />
                </Link>
            </li>
        </ul>
    )
}

export function DesktopListItem(props) {
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
    } = props.warehouse;
    return(
        <ul className="desktop-warehouse__row">
            <li className="desktop-warehouse__row--1">
                <Link to={`/warehouses/${id}`}>
                    {warehouse_name}
                    <img src={chevron}/>
                </Link>
            </li>
            <li className="desktop-warehouse__row--2">{`${address}, ${city}, ${country}`}</li>
            <li className="desktop-warehouse__row--3">{contact_name}</li>
            <li className="desktop-warehouse__row--4">
                <p>{contact_phone}</p>
                <p>{contact_email}</p>
            </li>
            <li className="desktop-warehouse__row--5">
                <img src={delete_icon} />
                <Link to="/edit-warehouse">
                    <img src={edit_icon} />
                </Link>
            </li> 
        </ul>
     )
}
