import arrowback from '../../assets/icons/arrow_back-24px.svg';
import {Link, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import './EditInventory.scss'

export default function EditInventory() {
    //Get warehouse list for the dropdown in the form
    const [warehouseList, setWarehouseList] = useState([]);

    //const baseURL = import.meta.env.VITE_API_URL; as the env file is ignored in git, so hard-code the baseURL now.
    const baseURL = "http://localhost:3000/api";

    const fetchWarehouses = async() => {
        const warehousedata = await axios.get(`${baseURL}/warehouses`);
        setWarehouseList(warehousedata.data);
        return warehousedata.data;
    }

    useEffect(() => {
        try {
            fetchWarehouses();
        } catch(e) {
            console.log(e)
        }
    },[]);

//-----------------------------------------------------------------
    // Get inventory on ID and pass data to the field
    const { inventoryid } = useParams(); 

    const [textInput, setTextInput] = useState({
        item_name: '',
        description: '',
        category: ''
    });
    const [status, setStatus] = useState("");
    const [quantity, setQuantity] = useState("");
    const [warehouseName, setWarehouseName] = useState("")

    useEffect(() => {
        const getData = async () => {
            const getInventory = await axios.get(`${baseURL}/inventories/${inventoryid}`)
            setTextInput({
                item_name:getInventory.data.item_name,
                description: getInventory.data.description,
                category: getInventory.data.category
            });
            setStatus(getInventory.data.status)
            setQuantity(getInventory.data.quantity)
            setWarehouseName(getInventory.data.warehouse_name)
        }
        getData();
    }, [])

//--------------------------------------------------------------------------
    //Handle form change and submit form
    //Handle simple text field
    const handleTextInput = (e) => {
        const { name, value} = e.target.value;
        
        setTextInput(prev => ({
            ...prev,
            [name]: value
        }));

    }    
    
    //Handle status and quantity
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
    

    const handleWarehouse = (e) => {
        setWarehouseName(e.target.value)
    }

    // Handle form submit
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const getWarehouseId = warehouseList.find((warehouse) => warehouse.warehouse_name === warehouseName)

        const updateInventory = {
            ...textInput,
            status: status,
            quantity: Number((status === "Out of Stock") ? "0" : quantity),
            warehouse_id:getWarehouseId.id
        }
        console.log(updateInventory)

        // try{
        //     const res = await axios.post(`${baseURL}/inventories`,newInventory);
        //     alert("The item has been created successfully.");
        //     console.log(res);
        // }catch (e){
        //     alert(e.response.data.message);
        // }

        // navigate('/inventory');
    }

    return (
        <div className='inventory-edit'>
            <div className='inventory-edit__heading'>
                <Link to="/inventory">
                    <img src={arrowback} alt="arrow_back"/>
                </Link>
                <h1>Edit New Inventory Item</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='inventory-edit_content'>
                    <section className='inventory-edit__section'>
                        <h2>Item Details</h2>
                        <div className='inventory-edit__form-field'>
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

                        <div className='inventory-edit__form-field'>
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

                        <div className='inventory-edit__form-field'>
                            <label htmlFor="category">Item Category</label>
                            <div className='inventory-edit__form-dropdown'>
                                <select
                                    id="category"
                                    name="category"
                                    value={textInput.category}
                                    onChange={handleTextInput}
                                >
                                    <option value="no select">Please select</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Gear">Gear</option>
                                    <option value="Apparel">Apparel</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Health">Health</option>                  
                                </select>
                            </div>
                            
                        </div>
                    </section>
    
                    <section className='inventory-edit__section'>
                        <h2>Item Availability</h2>
                        <div className='inventory-edit__form-field'>
                            <label htmlFor="status">Status</label>
                            <div className='inventory-edit__form-status'>
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

                        <div className={`inventory-edit__form-field ${(status==="Out of Stock") ? 'quantity-close' : 'quantity'}`}>
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

                        <div className='inventory-edit__form-field'>
                            <label htmlFor="warehouse_name">Warehouse</label>
                            <div className='inventory-edit__form-dropdown'>
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

                <div className='inventory-edit__button'>
                    <button type="button" className="cancel">
                        <Link to="/inventory">
                            Cancel
                        </Link>
                    </button>
                    <button type="submit" className="save">
                        + Edit Item
                    </button>
                </div>
            </form>
        </div>
    )
}