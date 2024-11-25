import {useEffect, useState} from 'react';
import './EditWhList.scss';
import arrow from '../../assets/icons/arrow_back-24px.svg';
import axios from "axios";
import {useParams} from "react-router-dom";

// Pass in id as the params. Use 1 as the default for test.
export default function EditWhList() {
    const id = useParams().id;
    useEffect(() => {
        const getData = async () => {
            const userData = await axios.get(`http://localhost:3000/api/warehouses/${id}`)
            setFormData(userData.data)
        }
        getData();
    }, []);


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.put(`http://localhost:3000/api/warehouses/${id}`,formData);
            alert("The warehouse details have been updated successfully.")
        }catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <div className="warehouse-edit">
            <header className="warehouse-edit__header">
                <button className="back-button" onClick={() => console.log('Go back')}>
                    <img src={arrow} alt="arrow_back"/>
                </button>
                <h1>Edit Warehouse</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="warehouse-edit__content">
                    <section className="warehouse-edit__section">
                        <h2>Warehouse Details</h2>
                        <div className="warehouse-edit__form-group">
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

                        <div className="warehouse-edit__form-group">
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

                        <div className="warehouse-edit__form-group">
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

                        <div className="warehouse-edit__form-group">
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
                    <div className="warehouse-edit__divider"></div>
                    <section className="warehouse-edit__section">
                        <h2>Contact Details</h2>

                        <div className="warehouse-edit__form-group">
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

                        <div className="warehouse-edit__form-group">
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

                        <div className="warehouse-edit__form-group">
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

                        <div className="warehouse-edit__form-group">
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

                <div className="warehouse-edit__actions">
                    <button type="button" className="cancel">
                        Cancel
                    </button>
                    <button type="submit" className="save">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

