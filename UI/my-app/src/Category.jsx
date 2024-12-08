import React, { useState, useEffect } from "react";
import { variables } from "./Variables.js";
import CategoryForm from "./Components/CategoryForm";
import "./Category.css";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  const refreshList = () => {
    fetch(variables.API_URL + "app/category")
      .then((response) => response.json())
      .then((data) => setCategories(data));
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
      }).then(() => refreshList());
    }
  };

  const handleCreateOrUpdate = () => {
    const categoryData = { CategoryName: categoryName };

    if (categoryId === 0) {
      fetch(`${variables.API_URL}app/category/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      }).then(() => refreshList());
    } else {
      fetch(`${variables.API_URL}app/category/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CategoryId: categoryId, CategoryName: categoryName }),
      }).then(() => refreshList());
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
        <tbody>
          {categories.map((category) => (
            <tr key={category.CategoryId}>
              <td>{category.CategoryId}</td>
              <td>{category.CategoryName}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(category)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(category.CategoryId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CategoryForm
        modalTitle={modalTitle}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        handleCreateOrUpdate={handleCreateOrUpdate}
      />
    </div>
  );
};