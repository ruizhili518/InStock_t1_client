import {BrowserRouter, Routes, Route} from "react-router-dom";
import Warehouses from "./pages/warehouses/Warehouses.jsx";
import WarehouseDetails from "./pages/warehouses/WarehouseDetails.jsx";
import AddWarehouse from "./pages/warehouses/AddWarehouse.jsx";
import EditWarehouse from "./pages/warehouses/EditWarehouse.jsx";
import Inventory from "./pages/inventory/Inventory.jsx";
import ItemDetails from "./pages/inventory/ItemDetails.jsx";
import AddItem from "./pages/inventory/AddItem.jsx";
import EditItem from "./pages/inventory/EditItem.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Warehouses/>}></Route>
                <Route path="/warehouse-details" element={<WarehouseDetails/>}></Route>
                <Route path="/add-warehouse" element={<AddWarehouse/>}></Route>
                <Route path="/edit-warehouse/:id" element={<EditWarehouse/>}></Route>
                <Route path="/inventory" element={<Inventory/>}></Route>
                <Route path="/item-details" element={<ItemDetails/>}></Route>
                <Route path="/add-item" element={<AddItem/>}></Route>
                <Route path="/edit-item" element={<EditItem/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
