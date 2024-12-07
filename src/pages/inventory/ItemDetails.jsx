import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Missing in your imports
import arrowback from '../../assets/icons/arrow_back-24px.svg';
import editwhite from '../../assets/icons/edit-white-24px.svg';
import './ItemDetails.scss';

function ItemDetails() {
  const baseURL = import.meta.env.VITE_API_URL;
  const { itemid } = useParams(); // Extract `id` from URL params
  const [itemDetails, setItemDetails] = useState(null); // State to hold the item details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/inventories/${itemid}`); // Correct URL
        setItemDetails(response.data); // Set the item details in state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Failed to fetch item details:', error);
        setError('Could not fetch item details'); // Update error state
        setLoading(false); // Set loading to false
      }
    };

    fetchItemDetails();
  }, [itemid]); // Add `id` as a dependency

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!itemDetails) {
    return <p>Item not found</p>;
  }

  const {
    warehouse_name,
    item_name,
    description,
    category,
    status,
    quantity,
  } = itemDetails; // Destructure the item details

  return (
    <section className="inventory__details">
      <section className="inventory__details--header">
        <div className="inventory__details--header--title">
          <Link to="/inventory/">
            <img src={arrowback} alt="Back" />
          </Link>
          <p>{item_name}</p>
        </div>
        <div className="inventory__details--header--button--edit">
          <Link to={`/edit-item/${itemid}`}>
            <img src={editwhite} alt="Edit" />
          </Link>
          <p>Edit</p>
        </div>
      </section>
      <section className="inventory__details--info">
        <div className="inventory__details--info--left">
          <p className="inventory__details--heading">ITEM DESCRIPTION:</p>
          <p className="inventory__details--detail">{description}</p>
          <p className="inventory__details--heading">CATEGORY:</p>
          <p className="inventory__details--detail">{category}</p>
        </div>
        <div className="inventory__details--info--right">
          <div className="inventory__details--info--right--1">
            <p className="warehouse-details--heading">STATUS:</p>
            <div className="inventory__details--detail">
            <p className={`inventory__details--tag ${status === "In Stock" ? "tag--in-stock" : "tag--out-of-stock"}`}>{status}</p>
            </div>
            <p className="warehouse-details--heading">WAREHOUSE:</p>
            <p className="inventory__details--detail">{warehouse_name}</p>
          </div>
          <div className="inventory__details--info--right--2">
            <p className="warehouse-details--heading">QUANTITY:</p>
            <p className="inventory__details--detail">{quantity}</p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ItemDetails;