import React, { useState, useEffect } from "react";
import { variables } from "./Variables.js";
import './Category.css';

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  const refreshList = () => {
    fetch(variables.API_URL + "app/category")
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, []); 

  const addClick = () => {
    setModalTitle("Add Category");
    setCategoryId(0);
    setCategoryName("");
  };

  const editClick = (category) => {
    setModalTitle("Edit Category");
    setCategoryId(category.CategoryId);
    setCategoryName(category.CategoryName);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      fetch(`${variables.API_URL}app/category/${categoryId}`, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(() => {
          refreshList();
        })
        
    }
  };

  const changeCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const handleCreateOrUpdate = () => {
    const categoryData = { CategoryName: categoryName };

    if (categoryId === 0) {
      // Create a new category
      fetch(`${variables.API_URL}app/category/`, {
        method: "POST",
        headers: {

          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })
        .then(response => response.json())
        .then(() => {
          refreshList();
        })
        
    } else {
      // Update existing category
      fetch(`${variables.API_URL}app/category/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CategoryId: categoryId,  // Pass the correct CategoryId
          CategoryName: categoryName // Add other fields like CategoryName
        }),
      })
        .then(response => response.json())
        .then(() => {
          refreshList();
        })
        
    }
    
  };

  return (
    <div className="bodys">
      <h3 className="text-center my-4">Category</h3>
      <button
        type="button"
        className="btn m-2 float-start"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addClick}
      >
        Add Category
      </button>
      <table className="table table-striped float-middle">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody className="bodys">
          {categories.map((category) => (
            <tr key={category.CategoryId}>
              <td>{category.CategoryId}</td>
              <td>{category.CategoryName}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary m-2 float-middle"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(category)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-danger m-2 float-middle"
                  onClick={() => handleDelete(category.CategoryId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                  >
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
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">CategoryName</span>
                <input
                  type="text"
                  className="form-control"
                  value={categoryName}
                  onChange={changeCategoryName}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary float-start"
              onClick={handleCreateOrUpdate}
            >
              {categoryId === 0 ? "Create" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
