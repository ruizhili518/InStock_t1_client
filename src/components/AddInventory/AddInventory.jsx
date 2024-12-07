import axios from "axios";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import arrowback from '../../assets/icons/arrow_back-24px.svg';
import './AddInventory.scss';

function AddInventory() {
    //Get warehouse list for the dropdown in the form
    const [warehouseList, setWarehouseList] = useState([]);

    const baseURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        try {
            const fetchWarehouses = async() => {
                const warehousedata = await axios.get(`${baseURL}/warehouses`);
                setWarehouseList(warehousedata.data);
            }
            fetchWarehouses();
        } catch(e) {
            console.log(e)
        }
    },[]);

    //Handle simple text input
    const [textInput, setTextInput] = useState({
        item_name: '',
        description: '',
        category: 'no select'
    });
    
    const handleTextInput = (e) => {
        const { name, value } = e.target;

        setTextInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    //Handle Status and Quantity
    const [status, setStatus] = useState("In Stock");
    const [quantity, setQuantity] = useState("");
    
    const handleStatusQuantity = (e) => {
        const { name, value } = e.target;

        if (name==="status") {
            setStatus(e.target.value);
        }

        if (name === "quantity") {
            setQuantity(e.target.value)
        }

    }

    //Handle warehouse name to get warehouse ID
    const [warehouseId, setWarehouseId] = useState("");
    const [warehouseName, setWarehouseName] = useState("no warehouse")

    const handleWarehouse = (e) => {
        setWarehouseName(e.target.value)
        const findWarehouse = warehouseList.find((warehouse) => warehouse.warehouse_name === e.target.value)
        setWarehouseId(findWarehouse.id)
    }
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newInventory = {
            ...textInput,
            status: status,
            quantity: Number((status === "Out of Stock") ? "0" : quantity),
            warehouse_id:warehouseId
        }

        try{
            const res = await axios.post(`${baseURL}/inventories`,newInventory);
            alert("The item has been created successfully.");
        }catch (e){
            alert(e.response.data.message);
        }

        navigate('/inventory');
    }

    return(
        <div className='inventory-add'>
            <div className='inventory-add__heading'>
                <Link to="/inventory">
                    <img src={arrowback} alt="arrow_back"/>
                </Link>
                <h1>Add New Inventory Item</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='inventory-add__content'>
                    <section className='inventory-add__section'>
                        <h2>Item Details</h2>
                        <div className='inventory-add__form-field'>
                            <label htmlFor="item_name">Item Name</label>
                            <input
                                type="text"
                                id="item_name"
                                name="item_name"
                                value={textInput.item_name}
                                onChange={handleTextInput}
                                placeholder={"Item Name"}
                            />
                        </div>

                        <div className='inventory-add__form-field'>
                            <label htmlFor="description">Item Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={textInput.description}
                                onChange={handleTextInput}
                                placeholder={"Please enter a brief item description..."}
                            />
                        </div>

                        <div className='inventory-add__form-field'>
                            <label htmlFor="category">Item Category</label>
                            <div className='inventory-add__form-dropdown'>
                                <select
                                    id="category"
                                    name="category"
                                    value={textInput.category}
                                    onChange={handleTextInput}
                                >
                                    <option value="no select">Please select</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="gear">Gear</option>
                                    <option value="apparel">Apparel</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="health">Health</option>                  
                                </select>
                            </div>
                            
                        </div>
                    </section>
    
                    <section className='inventory-add__section'>
                        <h2>Item Availability</h2>
                        <div className='inventory-add__form-field'>
                            <label htmlFor="status">Status</label>
                            <div className='inventory-add__form-status'>
                                <input
                                    checked={status==="In Stock"}
                                    type="radio"
                                    id="item_status-instock"
                                    name="status"
                                    value="In Stock"
                                    onChange={handleStatusQuantity}
                                />
                                <label htmlFor="item_status-instock">In stock</label>
                                <input
                                    checked={status==="Out of Stock"}
                                    type="radio"
                                    id="item_status-outstock"
                                    name="status"
                                    value="Out of Stock"
                                    onChange={handleStatusQuantity}
                                />
                                <label htmlFor="item_status-outstock">Out of stock</label>
                            </div>
                        </div>

                        <div className={`inventory-add__form-field ${(status==="Out of Stock") ? 'quantity-close' : 'quantity'}`}>
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={handleStatusQuantity}
                                placeholder={"0"}
                            />
                        </div>

                        <div className='inventory-add__form-field'>
                            <label htmlFor="warehouse_name">Warehouse</label>
                            <div className='inventory-add__form-dropdown'>
                                <select
                                    id="warehouse_name"
                                    name="warehouse_name"
                                    value={warehouseName}
                                    onChange={handleWarehouse}
                                >
                                    <option value="no warehouse">Please select</option>
                                    {warehouseList.map((warehouse) => (
                                        <option key={warehouse.id} value={warehouse.warehouse_name}>
                                            {warehouse.warehouse_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>
                </div>

                <div className='inventory-add__button'>
                    <button type="button" className="cancel">
                        <Link to="/inventory">
                            Cancel
                        </Link>
                    </button>
                    <button type="submit" className="save">
                        + Add Item
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddInventory;