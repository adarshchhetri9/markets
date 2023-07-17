import React from "react";
import homeStore, { Coin } from "../stores/homeStore";
import { Link } from "react-router-dom";

interface HomeStore {
  fetchCoins: () => Promise<void>;
  coins: Coin[];
}

export default function Home() {
  const store: HomeStore = homeStore() as HomeStore;

  React.useEffect(() => {
    store.fetchCoins();
  }, []);

  return (
    <div>
      <input type="text" value={store.query} onChange={store.setQuery} />
      {store.coins.map((coin) => {
        return (
          <div key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
