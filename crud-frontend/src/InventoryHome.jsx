import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddItemPopup from './AddItemPopup';
import ItemDetailsPopup from './ItemDetailsPopup'

function InventoryHome() {

    const currUser = localStorage.getItem('userId')

    const [userInventory, setUserInventory] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [editItemId, setEditItemId] = useState(null);
    const [newItemName, setNewItemName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newQuantity, setNewQuantity] = useState('');

    const [popupItem, setPopupItem] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3000/userInventory/${currUser}`)
            .then(res => res.json())
            .then(data => setUserInventory(data))
    }, [currUser])


    const onDelete = async(e) => {

        if(loading) {
            return;
        }

        
        try {
            const response = await fetch(`http://localhost:3000/userItems/${e}/${currUser}`, {
                method: 'DELETE',
            })
            
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            const data = await response.json();
            setMessage('Item deleted');
            console.log('Success:', data);

            const updatedInventory = await fetch(`http://localhost:3000/userInventory/${currUser}`).then((res) =>
                res.json()
            );
            setUserInventory(updatedInventory);

        } catch (error) {
            console.log(error);
            return ({ message: 'Error deleting item', error })
        } finally {
            setLoading(false);
        }
    }

    const handlePopup = (item) => {
        setPopupItem(item);
    };
    const closePopup = () => {
        setPopupItem(null);
    };
    
    const HandleEdits = async (id) => {

        if (loading) {
            return;
        }
    
        if (!newItemName || !newDescription || !newQuantity) {
            setMessage('All fields must be filled in.');
            return;
        }
    
        setLoading(true);
        setMessage('');
    
        try {
            const response = await fetch(`http://localhost:3000/itemDetails/${id}/${currUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName: newItemName,
                    description: newDescription,
                    quantity: newQuantity,
                }),
            });
    
            if (response.ok) {
                const updatedItem = await response.json();
                setUserInventory((prevInventory) =>
                    prevInventory.map((item) =>
                        item.id === id ? { ...item, ...updatedItem } : item
                    )
                );
                setEditItemId(null);
                setMessage('Item updated successfully');
            } else {
                const errorMessage = await response.json();
                console.error('Failed to update item:', errorMessage);
                setMessage(errorMessage.message || 'Failed to update item');
            }
        } catch (error) {
            console.error('Failed to update item:', error);
            setMessage('Error updating item');
        } finally {
            setLoading(false);
        }
    };


    
    return (
        <>
            {userInventory.map((e) => (
                <div key={e.id}>
                    {editItemId === e.id ? (
                    <>
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(e.target.value)}
                        />
                        <button type="button" onClick={() => HandleEdits(e.id)} disabled={loading}>
                            {loading ? 'Saving...' : 'Done'}
                        </button>
                        <button type="button" onClick={() => setEditItemId(null)}>
                            Cancel
                        </button>
                    </>
                    ) : (
                    <>
                        <div key={e.id} className="inventory-card" onClick={() => handlePopup(e)}>
                            <p>{e.itemName}</p>
                            <p>
                                {e.description.length > 100
                                    ? `${e.description.slice(0, 100)}...`
                                    : e.description}
                            </p>
                            <p>Quantity: {e.quantity}</p>
                            <button type="button" onClick={() => onDelete(e.id)}>Delete Item</button>
                            <button type="button" onClick={() => {
                                    setEditItemId(e.id);
                                    setNewItemName(e.itemName);
                                    setNewDescription(e.description);
                                    setNewQuantity(e.quantity);
                                }}
                            >Edit Item</button>
                        </div>
                        {popupItem && (
                            <div className="popup">
                                <div className="popup-content">
                                    <button onClick={closePopup} className="close-btn">X</button>
                                    <h2>{popupItem.itemName}</h2>
                                    <p>{popupItem.description}</p>
                                    <p>Quantity: {popupItem.quantity}</p>
                                </div>
                            </div>
                        )}
                    </>
                    )}
                </div>
            ))}
            <br />
            <button type="button" onClick={() => setButtonPopup(true)}>Add Item To Inventory</button>
            <AddItemPopup trigger={buttonPopup} setTrigger={setButtonPopup} />

            <br></br>
            <Link to='/'>Logout</Link>

        </>
    )

}

export default InventoryHome;