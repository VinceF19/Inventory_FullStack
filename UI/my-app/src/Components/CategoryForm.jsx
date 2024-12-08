import React from 'react';

const CategoryForm = ({
  modalTitle,
  categoryName,
  setCategoryName,
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
              <span className="input-group-text">Category Name</span>
              <input
                type="text"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
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

export default CategoryForm;