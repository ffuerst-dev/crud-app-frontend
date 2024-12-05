import React from 'react';
import { useState } from 'react'
import './AddItemPopup.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import InventoryHome from './InventoryHome';

function AddItemPopup(props) {
    const currUser = localStorage.getItem('userId')

    const [itemName, setItemName] = useState('');
    const [description, setItemDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        if (loading) {
            return;
        }

        if (!itemName || !description || !quantity) {
            setMessage('All fields are required.');
            return;
        }
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`http://localhost:3000/addItem/${currUser}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemName, description, quantity }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setMessage('Account created successfully!');
            console.log('Success:', data);

            
            navigate(`/InventoryHome`);
        } catch (error) {
            console.error(error);
            setMessage('An unexpected error occurred.');
            setLoading(false);
        }
        
    };
    
    return (props.trigger) ? (
        <div className='return-popup'>
            <form onSubmit={handleSubmit}>
                <div className='popup-inner'>
                    <div>
                        <label>Item Name:</label>
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            placeholder="Enter Item Name"
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setItemDescription(e.target.value)}
                            placeholder="Enter Item Description"
                            required
                        />
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input
                            type="integer"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Enter The Item Quantity"
                            required
                        />
                    </div>
                    <br />
                    <button type='submit'>Done</button>
                    <button type='button' id='cancel-btn' onClick={() => props.setTrigger(false)}>Cancel</button>
                    { props.children }
                </div>
            </form>
        </div>
    ) : '';
}

export default AddItemPopup;