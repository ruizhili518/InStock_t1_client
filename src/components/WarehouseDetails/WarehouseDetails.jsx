import arrowback from '../../assets/icons/arrow_back-24px.svg';
import editwhite from '../../assets/icons/edit-white-24px.svg';
import { Link } from 'react-router-dom';
import './WarehouseDetails.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import sort from "../../assets/icons/sort-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import delete_icon from "../../assets/icons/delete_outline-24px.svg";
import edit_icon from "../../assets/icons/edit-24px.svg";
import DeleteModal from "../DeleteModal/DeleteInventory.jsx";

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

    const [inventoryList, setInventoryList] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/inventories");
                const warehouseData = response.data.filter(item => item.warehouse_name === warehouse_name);
                setInventoryList(warehouseData);
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        };
        fetchData();
    }, [inventoryList]);

    const openModal = (item) => {
        setSelectedItem(item); // Set the selected item
        setModalState(true); // Open the modal
    };

    const closeModal = () => {
        setSelectedItem(null); // Clear the selected item
        setModalState(false); // Close the modal
    };

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
                    <Link to={`/edit-warehouse/${id}`}>
                        <img src={editwhite}/>
                        <p>Edit</p>
                    </Link>
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

            <div className="inv__list">
                <div className="inv__item">
                    <div className="inv__item--header inv__item--header--first">
                        <p>INVENTORY ITEM<img className="inv__item--header--icon" src={sort}/></p>
                    </div>
                    <div className="inv__item--header">
                        <p>CATEGORY<img className="inv__item--header--icon" src={sort}/></p>
                    </div>
                    <div className="inv__item--header">
                        <p>STATUS<img className="inv__item--header--icon" src={sort}/></p>
                    </div>
                    <div className="inv__item--header">
                        <p>QTY<img className="inv__item--header--icon" src={sort}/></p>
                    </div>
                    <div className="inv__item--header">
                        <p>ACTIONS</p>
                    </div>
                </div>
                {inventoryList.map((item) => (
                    <div key={item.id} className="inv__item">
                        <div className="inv__item--information">
                            <div className="inv__item--left">
                                <p className="inv__item--title">INVENTORY ITEM</p>
                                <Link to={`/inventory/${item.id}`} className="inv__item--value inv__item--link">
                                    {item.item_name}
                                    <img src={chevron} alt="View item details"/>
                                </Link>
                                <p className="inv__item--title">CATEGORY</p>
                                <p className="inv__item--value">{item.category}</p>
                            </div>

                            <div className="inv__item--right">
                                <p className="inv__item--title">STATUS</p>
                                <div className="inv__item--value">
                                    <p className={`inv__item--tag ${item.status === "In Stock" ? "tag--in-stock" : "tag--out-of-stock"}`}>
                                        {item.status}
                                    </p>
                                </div>
                                <p className="inv__item--title">QTY</p>
                                <p className="inv__item--value"> {item.quantity}</p>
                            </div>
                        </div>
                        <div className="inv__item--actions">
                            <button onClick={() => openModal(item)} className="inv__item--actions--btn">
                                <img className="inv__item--actions--btn" src={delete_icon} alt="Delete item"/>
                            </button>
                            <Link to={`/edit-item/${item.id}`}
                                  className="inv__item--actions--btn inv__item--actions--btn--edit">
                                <img src={edit_icon} alt="Edit item"/>
                            </Link>
                        </div>

                    </div>
                ))}
            </div>
            {selectedItem && (
                <DeleteModal
                    toggle={modalState}
                    inventoryname={selectedItem.item_name}
                    inventoryId={selectedItem.id}
                    action={closeModal}
                />
            )}
</section>
)
}

export default WarehouseInfo;