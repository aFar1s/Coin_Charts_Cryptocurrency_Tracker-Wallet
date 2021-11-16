import React, { useState, useEffect } from 'react'

function Landing() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    const changeTextField = (e) => {
        setSearch(e.target.value);
      };

    const filteredSearchString = coins.filter((coin) =>
    coin.name.toLowerCase()
    .includes(search.toLowerCase())
    );






    return (
        <div>
            
        </div>
    )
}

export default Landing
