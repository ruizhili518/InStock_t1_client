import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import WarehouseInfo from '../../components/WarehouseDetails/WarehouseDetails.jsx'

const WarehouseDetails = () => {
    const [warehouse,setWarehouse] = useState([]);

    // const baseURL = import.meta.env.VITE_API_URL;
    const baseURL = 'http://localhost:3000/api'

    //Fetch warehouse details
    const { warehouseid } = useParams(); 

    useEffect(() => {
        try{
            const fetchWarehouse = async() => {
                const warehouse=await axios.get(`${baseURL}/warehouses/${warehouseid}`);
                setWarehouse(warehouse.data);
            }
            fetchWarehouse();
        } catch(e) {
            console.log(e)
        }
    },[])

    return (
        <div>
            <WarehouseInfo warehouse={warehouse}/>
        </div>
    );
};

export default WarehouseDetails;