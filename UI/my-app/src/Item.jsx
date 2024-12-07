import React, { useState, useEffect } from "react";
import { variables } from "./Variables.js";

export const Item = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]); // Added state for categories
  const [modalTitle, setModalTitle] = useState("");
  const [itemId, setItemId] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemStock, setItemStock] = useState("");

  // Fetch items and categories
  const refreshList = () => {
    fetch(variables.API_URL + "app/item")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });

    // Fetch categories
    fetch(variables.API_URL + "app/category")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data); // Store categories
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
    setItemCategory(""); // Reset category
    setItemImage("");
    setItemStock("");
  };

  const editClick = (item) => {
    setModalTitle("Edit Item");
    setItemId(item.ItemId);
    setItemName(item.ItemName);
    setItemDescription(item.ItemDescription);
    setItemPrice(item.ItemPrice);
    setItemCategory(item.ItemCategory); // Set category
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
      // Create a new item
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
      // Update existing item
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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Stock</th>
            <th>Item Category</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
  {items.map((item) => (
    <tr key={item.ItemId}>
      <td>
        {item.ItemId}
        
      </td>
      <td>{item.ItemName}</td>
      <td>{item.ItemPrice}</td>
      <td>{item.ItemStock}{item.ItemStock < 5 && (
          <span className="text-danger small ms-1">Low on stock</span>
        )}</td>
      <td>{item.ItemCategory}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary m-2 float-middle"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => editClick(item)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </button>
        <button
          type="button"
          className="btn btn-danger m-2 float-middle"
          onClick={() => handleDelete(item.ItemId)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Item Name</span>
                <input
                  type="text"
                  className="form-control"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Description</span>
                <input
                  type="text"
                  className="form-control"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Price</span>
                <input
                  type="text"
                  className="form-control"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Category</span>
                <select
                  className="form-control"
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.CategoryId} value={category.CategoryName}>
                      {category.CategoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Image</span>
                <input
                  type="text"
                  className="form-control"
                  value={itemImage}
                  onChange={(e) => setItemImage(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Stock</span>
                <input
                  type="number"
                  className="form-control"
                  value={itemStock}
                  onChange={(e) => setItemStock(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateOrUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
