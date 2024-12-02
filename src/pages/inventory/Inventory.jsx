import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Inventory.scss";
import axios from "axios";
import AddNewItem from '../../components/AddNewItem/AddNewItem.jsx';
import Searchbar from '../../components/Searchbar/Search.jsx';
import chevron from '../../assets/icons/chevron_right-24px.svg';
import delete_icon from '../../assets/icons/delete_outline-24px.svg'; 
import edit_icon from '../../assets/icons/edit-24px.svg';
import sort from '../../assets/icons/sort-24px.svg';
import DeleteModal from "../../components/DeleteModal/DeleteInventory";


const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]); 
  const [modalState, setModalState] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/inventories");
        setInventoryList(response.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchData();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item); // Set the selected item
    setModalState(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedItem(null); // Clear the selected item
    setModalState(false); // Close the modal
  };

  return (
    <div className="inv">
      <div className="inv__header">
        <div className="inv__header--left">
          <h1 className="inv__header--title">Inventory</h1>
        </div>
        <div className="inv__header--right">
          <Searchbar />
          <AddNewItem path="/add-inventory" text="+ Add New Item" />
        </div>
      </div>

      

      <div className="inv__list">
          <div className="inv__item">
            <div className="inv__item--header inv__item--header--first">
                <p>INVENTORY ITEM<img className="inv__item--header--icon"  src={sort}/></p>
            </div>
            <div className="inv__item--header">
                <p>CATEGORY<img className="inv__item--header--icon"  src={sort}/></p>
            </div>
            <div className="inv__item--header">
                <p>STATUS<img className="inv__item--header--icon"  src={sort}/></p>
            </div>
            <div className="inv__item--header">
                <p>QTY<img className="inv__item--header--icon"  src={sort}/></p>
            </div>
            <div className="inv__item--header">
                <p>WAREHOUSE <img className="inv__item--header--icon" src={sort}/></p>
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
                  <img src={chevron} alt="View item details" />
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
              <p className="inv__item--title">WAREHOUSE</p>
              <p className="inv__item--value">{item.warehouse_name}</p>
              </div>
            </div>
            <div className="inv__item--actions">
              <button onClick={() => openModal(item)} className="inv__item--actions--btn">
                <img className="inv__item--actions--btn" src={delete_icon} alt="Delete item"/>
              </button>
              <Link to={`/edit-item/${item.id}`} className="inv__item--actions--btn inv__item--actions--btn--edit">
                <img src={edit_icon} alt="Edit item" />
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
    </div>
  );
};

export default Inventory;

