import React, { useState, useEffect } from "react";
import { variables } from "./Variables.js";

export const Home = () => {
  const [items, setItems] = useState([]);

  // Fetch the list of items
  useEffect(() => {
    fetch(variables.API_URL + "app/item")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  const handleBuyNow = (item) => {
    const quantity = prompt(
      `Enter quantity to buy (Available stock: ${item.ItemStock}):`
    );

    if (quantity) {
      const quantityNum = parseInt(quantity);

      if (isNaN(quantityNum) || quantityNum <= 0) {
        alert("Please enter a valid quantity.");
        return;
      }

      if (quantityNum > item.ItemStock) {
        alert("Not enough stock available.");
        return;
      }

      // Update stock locally
      const updatedItems = items.map((i) =>
        i.ItemId === item.ItemId
          ? { ...i, ItemStock: i.ItemStock - quantityNum }
          : i
      );
      setItems(updatedItems);

      // Send the update to the backend
      const updatedItem = { ...item, ItemStock: item.ItemStock - quantityNum };
      fetch(`${variables.API_URL}app/item/${item.ItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      })
        .then((response) => response.json())
        .then(() => {
          alert("Purchase successful!");
        })
        .catch(() => {
          alert("There was an error processing the purchase.");
        });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 className="my-4">Shop</h3>
      <div className="row">
        {items.map((item) => (
          <div key={item.ItemId} className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/300x200" // Placeholder for image
                alt={item.ItemName}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{item.ItemName}</h5>
                <p className="card-text">{item.ItemDescription}</p>
                <p className="card-text">
                  <strong>${item.ItemPrice}</strong>
                </p>
                <p className="card-text">Stock: {item.ItemStock}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBuyNow(item)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
