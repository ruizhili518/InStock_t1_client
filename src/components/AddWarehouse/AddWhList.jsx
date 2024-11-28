import {useState} from 'react';
import './AddWhList.scss';
import arrow from '../../assets/icons/arrow_back-24px.svg';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function AddWhList() {
    const [formData, setFormData] = useState({
        warehouse_name: '',
        address: '',
        city: '',
        country: '',
        contact_name: '',
        contact_position: '',
        contact_phone: '',
        contact_email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`http://localhost:3000/api/warehouses/`,formData);
            alert("The warehouse has been created successfully.");
        }catch (e){
            alert(e.response.data.message);
        }
        navigate('/');
    };

    return (
        <div className="warehouse-add">
            <header className="warehouse-add__header">
                <button className="back-button">
                    <Link to="/">
                        <img src={arrow} alt="arrow_back"/>
                    </Link>
                </button>
                <h1>Add New Warehouse</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="warehouse-add__content">
                    <section className="warehouse-add__section">
                        <h2>Warehouse Details</h2>
                        <div className="warehouse-add__form-group">
                            <label htmlFor="warehouse_name">Warehouse Name</label>
                            <input
                                type="text"
                                id="warehouse_name"
                                name="warehouse_name"
                                value={formData.warehouse_name}
                                onChange={handleInputChange}
                                placeholder={"Warehouse Name"}
                            />
                        </div>

                        <div className="warehouse-add__form-group">
                            <label htmlFor="address">Street Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder={"Street Address"}
                            />
                        </div>

                        <div className="warehouse-add__form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder={"City"}
                            />
                        </div>

                        <div className="warehouse-add__form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder={"Country"}
                            />
                        </div>
                    </section>
                    <div className="warehouse-add__divider"></div>
                    <section className="warehouse-add__section">
                        <h2>Contact Details</h2>

                        <div className="warehouse-add__form-group">
                            <label htmlFor="contact_name">Contact Name</label>
                            <input
                                type="text"
                                id="contact_name"
                                name="contact_name"
                                value={formData.contact_name}
                                onChange={handleInputChange}
                                placeholder={"Contact Name"}
                            />
                        </div>

                        <div className="warehouse-add__form-group">
                            <label htmlFor="contact_position">Position</label>
                            <input
                                type="text"
                                id="contact_position"
                                name="contact_position"
                                value={formData.contact_position}
                                onChange={handleInputChange}
                                placeholder={"Position"}
                            />
                        </div>

                        <div className="warehouse-add__form-group">
                            <label htmlFor="contact_phone">Phone Number</label>
                            <input
                                type="tel"
                                id="contact_phone"
                                name="contact_phone"
                                value={formData.contact_phone}
                                onChange={handleInputChange}
                                placeholder={"Phone Number"}
                            />
                        </div>

                        <div className="warehouse-add__form-group">
                            <label htmlFor="contact_email">Email</label>
                            <input
                                type="email"
                                id="contact_email"
                                name="contact_email"
                                value={formData.contact_email}
                                onChange={handleInputChange}
                                placeholder={"Email"}
                            />
                        </div>
                    </section>
                </div>

                <div className="warehouse-add__actions">
                    <button type="button" className="cancel">
                        <Link to="/">
                            Cancel
                        </Link>
                    </button>
                    <button type="submit" className="save">
                        + Add Warehouse
                    </button>
                </div>
            </form>
        </div>
    );
}