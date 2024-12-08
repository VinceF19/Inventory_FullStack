import React from 'react';

const ItemCard = ({ item, handleBuyNow }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm border-light rounded" style={{ height: "400px" }}>
        <img
          src={item.ItemImage}
          alt={item.ItemName}
          className="card-img-top rounded-top"
        />
        <div className="card-body d-flex flex-column" style={{ overflow: "hidden" }}>
          <h5 className="card-title text-truncate">{item.ItemName}</h5>
          <p className="card-text text-muted text-truncate">{item.ItemDescription}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <p className="card-text mb-0">
              <strong>₱{item.ItemPrice}</strong>
            </p>
            <p className="card-text mb-0">
              <small className="text-muted">Stocks: {item.ItemStock}</small>
            </p>
          </div>
          <button
            className="btn btn-buy-now"
            onClick={() => handleBuyNow(item)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;