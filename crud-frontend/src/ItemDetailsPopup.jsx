import React, { useState } from 'react';
import './ItemDetailsPopup.css'

function ItemDetailsPopup() {
    

    return (
        <>
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
    )
}

export default ItemDetailsPopup;