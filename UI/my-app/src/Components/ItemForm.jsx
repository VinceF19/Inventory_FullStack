import React from 'react';

const ItemForm = ({
  modalTitle,
  itemName,
  setItemName,
  itemDescription,
  setItemDescription,
  itemPrice,
  setItemPrice,
  itemCategory,
  setItemCategory,
  itemImage,
  setItemImage,
  itemStock,
  setItemStock,
  categories,
  handleCreateOrUpdate
}) => {
  return (
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
  );
};

export default ItemForm;