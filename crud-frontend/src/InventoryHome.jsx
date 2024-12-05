import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddItemPopup from './AddItemPopup';

function InventoryHome() {

    const currUser = localStorage.getItem('userId')

    const [userInventory, setUserInventory] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    

    useEffect(() => {
        fetch(`http://localhost:3000/userInventory/${currUser}`)
            .then(res => res.json())
            .then(data => setUserInventory(data))
    }, [])
    
    return (
        <>
            {userInventory.map((e, key) => (
                <>  
                    <p>{e.itemName}</p>
                    <p>{e.description}</p>
                    <p>{e.quantity}</p>
                </>
            ))}

            <button type="button" onClick={() => setButtonPopup(true)}>Add Item To Inventory</button>
            <AddItemPopup trigger={buttonPopup} setTrigger={setButtonPopup} />

            <br></br>
            <Link to='/'>Logout</Link>

        </>
    )

}

export default InventoryHome;