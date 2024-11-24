import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddNewItem from '../../components/AddNewItem/AddNewItem.jsx';
import Searchbar from '../../components/Searchbar/Search.jsx';
import WarehouseList from '../../components/Warehouselist/Warehouselist.jsx';
import './Warehouses.scss';


const Warehouses = () => {
    const [warehouseList, setWarehouseList] = useState([]);
    
    //Fetch warehouselist
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
    
    return (
        <div className='warehouse'>
            <section className='warehouse__header'>
                <p className='warehouse__header--title'>Warehouses</p>
                <Searchbar/>
                <AddNewItem path="/add-warehouse" text="+ Add New Warehouse"/>
            </section> 
            
            <section className='warehouse__list'>
                <WarehouseList warehouseList={warehouseList}/>
            </section>
        </div>
    );
};

export default Warehouses;