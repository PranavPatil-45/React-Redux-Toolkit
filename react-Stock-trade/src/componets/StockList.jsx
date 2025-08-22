import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStock } from "../features/stockSlice";

function StockList({ setEditData }) {
  const stocks = useSelector(state => state.stocks);
  const dispatch = useDispatch();

  const totalValue = stocks.reduce((sum, stock) => sum + stock.qty * stock.price, 0);

  const handleDelete = (id, ticker) => {
    if (window.confirm(`Are you sure you want to delete ${ticker} from your portfolio?`)) {
      dispatch(deleteStock(id));
    }
  };

  return (
    <div className="portfolio-container">
      <div className="card trading-card border-0">
        <div className="card-header trading-gradient py-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-white fw-bold">
            <i className="fas fa-chart-pie me-2"></i>
            Investment Portfolio
          </h4>
          <span className="badge bg-light text-dark fs-6">
            {stocks.length} Holding{stocks.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="card-body bg-dark p-0">
          {stocks.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0">
                <thead className="table-secondary">
                  <tr>
                    <th className="ps-4">Ticker</th>
                    <th>Company</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Value</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map(stock => (
                    <tr key={stock.id} className="position-row">
                      <td className="fw-bold fs-5 ps-4">
                        <span className="ticker-badge">{stock.ticker}</span>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span>{stock.name}</span>
                          <small className="text-muted">Equity</small>
                        </div>
                      </td>
                      <td className="fs-6">{stock.qty.toLocaleString()}</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span>₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          <small className={stock.price >= stock.price * 0.95 ? "text-success" : "text-danger"}>
                            <i className={`fas ${stock.price >= stock.price * 0.95 ? "fa-caret-up" : "fa-caret-down"} me-1`}></i>
                            {stock.price >= stock.price * 0.95 ? "+2.45%" : "-1.23%"}
                          </small>
                        </div>
                      </td>
                      <td className="fw-bold text-success">₹{(stock.qty * stock.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="text-end pe-4">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => setEditData(stock)}
                            title="Edit holding"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(stock.id, stock.ticker)}
                            title="Delete holding"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="table-active">
                    <td colSpan="4" className="fw-bold fs-5 ps-4">Total Portfolio Value</td>
                    <td colSpan="2" className="fw-bold text-primary fs-5 pe-4">
                      ₹{totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-folder-open fs-1 text-muted mb-3"></i>
              <h5 className="text-light">No investments yet</h5>
              <p className="text-muted">Add your first stock to start tracking your portfolio</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .portfolio-container {
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
        .position-row:hover {
          background: linear-gradient(90deg, rgba(51, 51, 51, 0.5) 0%, rgba(33, 37, 41, 0.5) 100%);
          transform: translateY(1px);
          transition: all 0.2s ease;
        }
        .ticker-badge {
          background: linear-gradient(135deg, #3a6186 0%, #89253e 100%);
          padding: 5px 10px;
          border-radius: 4px;
          color: white;
        }
        .btn-outline-warning {
          color: #ffc107;
          border-color: #ffc107;
        }
        .btn-outline-warning:hover {
          background-color: #ffc107;
          color: #000;
        }
        .btn-outline-danger {
          color: #dc3545;
          border-color: #dc3545;
        }
        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: #fff;
        }
        .table th {
          border-top: none;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          padding: 1rem 0.5rem;
        }
        .table td {
          padding: 1rem 0.5rem;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}

export default StockList;