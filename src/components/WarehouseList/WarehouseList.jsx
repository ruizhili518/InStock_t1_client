import { MobileListItem, DesktopListItem } from "../WarehouseListItem/WarehouseListItem";
import sort from '../../assets/icons/sort-24px.svg';
import './WarehouseList.scss';

function WarehouseList(props) {
    const warehouseList = props.warehouseList;
    
    return (
        <>
        <section className="mobile-list">
            {warehouseList.map((warehouse) => {
                return(
                    <MobileListItem key={warehouse.id} warehouse={warehouse}/>
                ) 
            })}
        </section>
        <section className="desktop-list">
            <ul className="desktop-warehouse desktop-warehouse__header">
                <li className="desktop-warehouse__header--1">
                    <p>WAREHOUSE</p>
                    <img src={sort} />
                </li>
                <li className="desktop-warehouse__header--2">
                    <p>ADDRESS</p>
                    <img src={sort} />
                </li>
                <li className="desktop-warehouse__header--3">
                    <p>CONTACT NAME</p>
                    <img src={sort} />
                </li>
                <li className="desktop-warehouse__header--4">
                    <p>CONTACT INFORMATION</p>
                    <img src={sort} />
                </li>
                <li className="desktop-warehouse__header--5">
                    ACTIONS
                </li>
            </ul>
            {warehouseList.map((warehouse) => {
                return(
                     <DesktopListItem key={warehouse.id} warehouse={warehouse}/>
                ) 
            })}     
        </section>
        </>
    )
}

export default WarehouseList;