import React, { useState, useEffect } from "react";
import { variables } from "./Variables.js";
import ItemCard from "./ItemCard";
import SearchBar from "./SearchBar";
import "./Home.css"; // Ensure you include your styling

export const Home = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

      const updatedItems = items.map((i) =>
        i.ItemId === item.ItemId
          ? { ...i, ItemStock: i.ItemStock - quantityNum }
          : i
      );
      setItems(updatedItems);

      const updatedItem = { ...item, ItemStock: item.ItemStock - quantityNum };
      fetch(`${variables.API_URL}app/item/${item.ItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      })
        .then(() => {
          alert("Purchase successful!");
        })
        .catch(() => {
          alert("There was an error processing the purchase.");
        });
    }
  };

  const filteredItems = items.filter((item) =>
    item.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ItemDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="container">
        <h3 className="text-center my-4">SHOP</h3>
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
