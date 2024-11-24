import { Link } from "react-router-dom";
import chevron from '../../assets/icons/chevron_right-24px.svg';
import delete_icon from '../../assets/icons/delete_outline-24px.svg'; 
import edit_icon from '../../assets/icons/edit-24px.svg'; 
import './WarehouseListItem.scss'


export function MobileListItem(props) {
    const warehouse = props.warehouse;

    return(
        <ul className="mobile-warehouse">
            <li className="mobile-warehouse__item">
                <p className="mobile-warehouse__item--title">WAREHOUSE</p>
                <Link to={`/warehouses/${warehouse.id}`}>
                    {warehouse.warehouse_name}
                    <img src={chevron}/>
                </Link>
            </li>
            <li className="mobile-warehouse__item">
                <p className="mobile-warehouse__item--title">CONTACT NAME</p>
                <p>{warehouse.contact_name}</p>
            </li>
            <li className="mobile-warehouse__item">
                <p className="mobile-warehouse__item--title">ADDRESS</p>
                <p>{warehouse.address}</p>
            </li>
            <li className="mobile-warehouse__item">
                <p className="mobile-warehouse__item--title">CONTACT INFORMATION</p>
                <p>{warehouse.contact_phone}</p>
                <p>{warehouse.contact_email}</p>
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
    const warehouse = props.warehouse;
    return(
        <ul className="desktop-warehouse__row">
            <li className="desktop-warehouse__row--1">
                <Link to={`/warehouses/${warehouse.id}`}>
                    {warehouse.warehouse_name}
                    <img src={chevron}/>
                </Link>
            </li>
            <li className="desktop-warehouse__row--2">{warehouse.address}</li>
            <li className="desktop-warehouse__row--3">{warehouse.contact_name}</li>
            <li className="desktop-warehouse__row--4">
                <p>{warehouse.contact_phone}</p>
                <p>{warehouse.contact_email}</p>
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
