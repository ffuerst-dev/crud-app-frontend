import { useParams, useNavigate } from "react-router-dom"
import React, { useState, useEffect }from 'react'

function DeleteItem() {
    const currUser = localStorage.getItem('userId');

    const [item, setItem] = useState('');
    const navigate = useNavigate();

    const onDelete = async(e) => {

        if(loading) {
            return;
        }

        
        try {
            const response = await fetch(`http:localhost:3000/userItems/${userInventory.id}/${currUser}`, {
                method: DELETE,
            })
            
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            const data = await response.json();
            setMessage('Item deleted');
            console.log('Success:', data);
            navigate('/InventoryHome');

        } catch (error) {
            console.log(error);
            return ({ message: 'Error deleting item', error })
        }
    }


    return (
        <>
            <p>hello world</p>
        </>
    )

}

export default DeleteItem