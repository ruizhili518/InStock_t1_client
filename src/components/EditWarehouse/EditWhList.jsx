import { useState } from 'react';
import './EditWhList.scss';
import arrow from '../../assets/icons/arrow_back-24px.svg';

export default function EditWhList() {
    const [formData, setFormData] = useState({
        warehouseName: '',
        streetAddress: '',
        city: '',
        country: '',
        contactName: '',
        position: '',
        phoneNumber: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
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
                            <label htmlFor="warehouseName">Warehouse Name</label>
                            <input
                                type="text"
                                id="warehouseName"
                                name="warehouseName"
                                value={formData.warehouseName}
                                onChange={handleInputChange}
                                placeholder={"Warehouse Name"}
                            />
                        </div>

                        <div className="warehouse-edit__form-group">
                            <label htmlFor="streetAddress">Street Address</label>
                            <input
                                type="text"
                                id="streetAddress"
                                name="streetAddress"
                                value={formData.streetAddress}
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
                            <label htmlFor="contactName">Contact Name</label>
                            <input
                                type="text"
                                id="contactName"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleInputChange}
                                placeholder={"Contact Name"}
                            />
                        </div>

                        <div className="warehouse-edit__form-group">
                            <label htmlFor="position">Position</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                placeholder={"Position"}
                            />
                        </div>

                        <div className="warehouse-edit__form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder={"Phone Number"}
                            />
                        </div>

                        <div className="warehouse-edit__form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
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

