import "./App.css";
import { useEffect, useState } from "react";
import apiInstance from "./api/api";

function App() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [user, setUser] = useState({});
  const [input, setinput] = useState({
    id: "",
    amount: 0,
    transferID: "",
  });

  async function getdata() {
    const { data } = await apiInstance.get(`/users`);
    setData(data);
  }

  const sendingChanges = async () => {
    await apiInstance.put(`/users/${type}`, input);
    getdata();
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (user.hasOwnProperty("name"))
      setUser(data.find((item) => item._id === user._id));
  }, [data]);

  useEffect(() => {
    setinput({ ...input, id: user._id });
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="App">
      {data.map((account) => {
        return (
          <button
            onClick={() => {
              setUser(account);
            }}
            key={account._id}
          >
            {account.name} /{account.money}/{account.credit}
          </button>
        );
      })}

      <select
        onChange={(event) => {
          setType(event.target.value);
        }}
      >
        <option value="" hidden>
          select an option
        </option>
        <option value="deposit">Deposit</option>
        <option value="credit">Credit</option>
        <option value="withdraw">Withdraw</option>
        <option value="transfer">Transfer</option>
      </select>
      <div className="selected">
        {user.name}/{user.money}/{user.credit}
      </div>

      <input
        label="amount"
        onChange={(event) => {
          const amount = +event.target.value;
          setinput({ ...input, amount: amount });
        }}
      ></input>

      <button
        onClick={() => {
          sendingChanges();
        }}
      >
        Click me
      </button>

      <select
        onChange={(event) => {
          setinput({ ...input, transferID: event.target.value });
        }}
      >
        <option value="" hidden>
          select an option
        </option>
        {data.map((account) => {
          return (
            <option value={account._id}>
              {account.name} /{account.money}/{account.credit}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default App;
