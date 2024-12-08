import React, { useState, useEffect } from "react";
import { variables } from "./Variables.js";
import ItemList from "./Components/ItemList";
import ItemForm from "./Components/ItemForm";

export const Item = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [itemId, setItemId] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemStock, setItemStock] = useState("");

  const refreshList = () => {
    fetch(variables.API_URL + "app/item")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });

    fetch(variables.API_URL + "app/category")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const addClick = () => {
    setModalTitle("Add Item");
    setItemId(0);
    setItemName("");
    setItemDescription("");
    setItemPrice("");
    setItemCategory("");
    setItemImage("");
    setItemStock("");
  };

  const editClick = (item) => {
    setModalTitle("Edit Item");
    setItemId(item.ItemId);
    setItemName(item.ItemName);
    setItemDescription(item.ItemDescription);
    setItemPrice(item.ItemPrice);
    setItemCategory(item.ItemCategory);
    setItemImage(item.ItemImage);
    setItemStock(item.ItemStock);
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`${variables.API_URL}app/item/${itemId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          refreshList();
        });
    }
  };

  const handleCreateOrUpdate = () => {
    const itemData = {
      ItemName: itemName,
      ItemDescription: itemDescription,
      ItemPrice: itemPrice,
      ItemCategory: itemCategory,
      ItemImage: itemImage,
      ItemStock: itemStock,
    };

    if (itemId === 0) {
      fetch(`${variables.API_URL}app/item/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      })
        .then((response) => response.json())
        .then(() => {
          refreshList();
        });
    } else {
      fetch(`${variables.API_URL}app/item/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ItemId: itemId,
          ItemName: itemName,
          ItemDescription: itemDescription,
          ItemPrice: itemPrice,
          ItemCategory: itemCategory,
          ItemImage: itemImage,
          ItemStock: itemStock,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          refreshList();
        });
    }
  };

  return (
    <div className="body">
      <h3 className="text-center my-4">Inventory Page</h3>
      <button
        type="button"
        className="btn justify-content-center m-2 float-start"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addClick}
      >
        Add Item
      </button>
      <ItemList items={items} editClick={editClick} handleDelete={handleDelete} />
      <ItemForm
        modalTitle={modalTitle}
        itemName={itemName}
        setItemName={setItemName}
        itemDescription={itemDescription}
        setItemDescription={setItemDescription}
        itemPrice={itemPrice}
        setItemPrice={setItemPrice}
        itemCategory={itemCategory}
        setItemCategory={setItemCategory}
        itemImage={itemImage}
        setItemImage={setItemImage}
        itemStock={itemStock}
        setItemStock={setItemStock}
        categories={categories}
        handleCreateOrUpdate={handleCreateOrUpdate}
      />
    </div>
  );
};