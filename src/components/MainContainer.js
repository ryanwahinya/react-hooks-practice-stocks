import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then(setStocks);
  }, []);

  function handleBuy(stock) {
    if (!portfolio.includes(stock)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  function handleSell(stock) {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  }

  function handleSort(type) {
    setSortType(type);
  }

  function handleFilter(type) {
    setFilterType(type);
  }

  const filteredStocks = stocks.filter((stock) =>
    filterType ? stock.type === filterType : true
  );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortType === "Alphabetically") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div>
      <SearchBar onSortChange={handleSort} onFilterChange={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={sortedStocks} onStockClick={handleBuy} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onStockClick={handleSell} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
