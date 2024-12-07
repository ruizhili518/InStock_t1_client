import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import AddItem from "./pages/inventory/AddItem.jsx";
import EditItem from "./pages/inventory/EditItem.jsx";
import Inventory from "./pages/inventory/Inventory.jsx";
import ItemDetails from "./pages/inventory/ItemDetails.jsx";
import AddWarehouse from "./pages/warehouses/AddWarehouse.jsx";
import EditWarehouse from "./pages/warehouses/EditWarehouse.jsx";
import WarehouseDetails from "./pages/warehouses/WarehouseDetails.jsx";
import Warehouses from "./pages/warehouses/Warehouses.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Warehouses/>}></Route>
                <Route path="/warehouses/:warehouseid" element={<WarehouseDetails/>}></Route>
                <Route path="/add-warehouse" element={<AddWarehouse/>}></Route>
                <Route path="/edit-warehouse/:id" element={<EditWarehouse/>}></Route>
                <Route path="/inventory" element={<Inventory/>}></Route>
                <Route path="/inventory/:itemid" element={<ItemDetails/>}></Route>
                <Route path="/add-item" element={<AddItem/>}></Route>
                <Route path="/edit-item/:inventoryid" element={<EditItem/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
