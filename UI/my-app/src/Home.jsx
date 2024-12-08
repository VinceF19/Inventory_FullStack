import React, { useState, useEffect } from "react";
import { variables } from "./Variables.js";
import './Home.css'; // Don't forget to import the CSS file
import SearchBar from './Components/SearchBar'; // Import SearchBar
import ItemCard from './Components/ItemCard'; // Import ItemCard

export const Home = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ItemDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="container">
        <h3 className="text-center my-4">SHOP</h3>

        {/* Search Bar Component */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="row">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item.ItemId} item={item} handleBuyNow={handleBuyNow} />
            ))
          ) : (
            <p className="text-center w-100">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
