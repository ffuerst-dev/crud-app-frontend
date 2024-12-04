import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'


function VisitorPage() {
    
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/Visitor')
        .then(res => res.json())
        .then(data => setInventory(data))
    }, [])

    return (
        <>
            <div>
                {inventory.map((e, key) => (
                    <div id={key}>
                        <p>{e.itemName}</p>
                        <p>{e.description}</p>
                        <p>{e.quantity}</p>
                    </div>
                ))}
                <Link to='/'>Return Home</Link>
            </div>
        </>
    )

}

export default VisitorPage;