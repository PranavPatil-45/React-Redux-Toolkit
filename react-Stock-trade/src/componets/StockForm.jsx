import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addStock, updateStock } from "../features/stockSlice";

function StockForm({ editData, setEditData }) {
  const [form, setForm] = useState({ ticker: "", name: "", qty: "", price: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (editData) {
        dispatch(updateStock({ ...form, qty: Number(form.qty), price: Number(form.price) }));
        setEditData(null);
      } else {
        dispatch(addStock({ ...form, id: Date.now(), qty: Number(form.qty), price: Number(form.price) }));
      }
      setForm({ ticker: "", name: "", qty: "", price: "" });
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="stock-form-container mb-4">
      <div className="card trading-card border-0">
        <div className="card-header trading-gradient py-3">
          <h4 className="mb-0 text-white fw-bold">
            <i className={`fas ${editData ? "fa-pen" : "fa-plus"} me-2`}></i>
            {editData ? "Update Stock Position" : "Add New Stock Position"}
          </h4>
        </div>
        <div className="card-body bg-dark">
          <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
            <div className="col-md-3">
              <label htmlFor="ticker" className="form-label text-light mb-1 small">Ticker Symbol</label>
              <div className="input-group">
                <span className="input-group-text bg-secondary border-secondary text-light">
                  <i className="fas fa-chart-line"></i>
                </span>
                <input
                  className="form-control trading-input bg-dark text-light border-secondary"
                  name="ticker"
                  value={form.ticker}
                  onChange={handleChange}
                  placeholder="e.g. AAPL"
                  required
                  style={{textTransform: 'uppercase'}}
                />
              </div>
            </div>
            
            <div className="col-md-3">
              <label htmlFor="name" className="form-label text-light mb-1 small">Company Name</label>
              <div className="input-group">
                <span className="input-group-text bg-secondary border-secondary text-light">
                  <i className="fas fa-building"></i>
                </span>
                <input
                  className="form-control trading-input bg-dark text-light border-secondary"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Apple Inc."
                  required
                />
              </div>
            </div>
            
            <div className="col-md-2">
              <label htmlFor="qty" className="form-label text-light mb-1 small">Quantity</label>
              <div className="input-group">
                <span className="input-group-text bg-secondary border-secondary text-light">
                  <i className="fas fa-layer-group"></i>
                </span>
                <input
                  className="form-control trading-input bg-dark text-light border-secondary"
                  type="number"
                  name="qty"
                  value={form.qty}
                  onChange={handleChange}
                  placeholder="Shares"
                  min="1"
                  required
                />
              </div>
            </div>
            
            <div className="col-md-2">
              <label htmlFor="price" className="form-label text-light mb-1 small">Price ($)</label>
              <div className="input-group">
                <span className="input-group-text bg-secondary border-secondary text-light">
                  <i className="fas fa-dollar-sign"></i>
                </span>
                <input
                  className="form-control trading-input bg-dark text-light border-secondary"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="col-md-2">
              <button 
                className={`btn btn-lg w-100 fw-bold ${editData ? "btn-warning" : "btn-success"}`} 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : editData ? (
                  <>
                    <i className="fas fa-sync me-2"></i> Update
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus me-2"></i> Add Stock
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .stock-form-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .trading-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }
        .trading-gradient {
          background: linear-gradient(135deg, #2c3e50 0%, #4a6580 100%);
          border: none;
        }
        .trading-input:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
          background-color: #1a1a1a !important;
        }
        .btn-success {
          background: linear-gradient(to bottom, #28a745 0%, #20c997 100%);
          border: none;
          transition: all 0.3s;
        }
        .btn-success:hover {
          background: linear-gradient(to bottom, #218838 0%, #1aa179 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .btn-warning {
          background: linear-gradient(to bottom, #ffc107 0%, #fd7e14 100%);
          border: none;
          transition: all 0.3s;
        }
        .btn-warning:hover {
          background: linear-gradient(to bottom, #e0a800 0%, #e36407 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

export default StockForm;