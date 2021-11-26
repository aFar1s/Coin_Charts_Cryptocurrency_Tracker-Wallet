import { useState, useEffect } from "react";
import axios from "axios";

const WalletDisplay = ({ key, cashTotal, quantity }) => {
    const userID = sessionStorage.getItem('userID');

    const [item, setItem] = useState({
        owner: userID,
        coinName: "",
        quantity: "",
      });
      const [items, setItems] = useState([
        {
          owner: userID,  
          coinName: "",
          quantity: "",
          _id: "",
        },
      ]);
    
      const [isPut, setIsPut] = useState(false);

      const [updatedItem, setUpdatedItem] = useState({
        owner: userID,  
        coinName: "",
        quantity: "",
        id: "",
      });


      useEffect(() => {
        fetch("/items")
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
        })
          .then((jsonRes) => setItems(jsonRes))
          .catch((err) => console.log(err));
      }, [items]);
    
      function handleChange(event) {
        const { name, value } = event.target;
        setItem((prevInput) => {
        return {
            ...prevInput,
            [name]: value,
          };
        });
      }
    
      function addItem(event) {
        event.preventDefault();
        const newCoin = {
            owner: userID,
            coinName: item.coinName,
            description: item.quantity,
        };
    
        axios.post("api/wallet/newWallet", newCoin);
        console.log(newCoin);
        alert("item added");
    
        setItem({
          owner: userID,
          coinName: "",
          quantity: "",
        });
      }
     
      function openUpdate(id) {
        setIsPut(true);
        setUpdatedItem((prevInput) => {
          return {
            ...prevInput,
            id: id,
          };
        });
      }
    
      function updateItem(id) {
        axios.put("/put/" + id, updatedItem);
        alert("item updated");
        console.log(`item with id ${id} updated`);
      }
    
      function handleUpdate(event) {
        const { name, value } = event.target;
        setUpdatedItem((prevInput) => {
          return {
            ...prevInput,
            [name]: value,
          };
        });
        console.log(updatedItem);
      }
    
      return (
        <div className="App">
          {!isPut ? (
            <div className="main">
              <input
                onChange={handleChange}
                name="title"
                defaultValue={item.coinName}
                placeholder="coin"
              ></input>
              <input
                onChange={handleChange}
                name="description"
                defaultValue={item.quantity}
                placeholder="quantity"
              ></input>
              
              <button onClick={addItem}>Buy Coin</button>
            </div>
          ) : (
            <div className="main">
              <input
                onChange={handleUpdate}
                name="title"
                defaultValue={updatedItem.coinName}
                placeholder="coin"
              ></input>
              <input
                onChange={handleUpdate}
                name="description"
                defaultValue={updatedItem.quantity}
                placeholder="quantity"
              ></input>
              <button onClick={() => updateItem(updatedItem.id)}>
                UPDATE ITEM
              </button>
            </div>
          )}
          {items.map((item) => {
            return (
              <div
                key={item._id}
                style={{ background: "green", width: "40%", margin: "auto auto" }}
              >
                <p>{item.coinName}</p>
                <p>{item.quantity}</p>
                <button onClick={() => openUpdate(item._id)}>Buy/Sell Coin</button>
              </div>
            );
          })}
        </div>
      );
}

export default WalletDisplay
