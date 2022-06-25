import "./App.css";
import { useEffect, useState } from "react";
import apiInstance from "./api/api";
import Button from "./components/Button/Button";
import Form from "./components/navbar/form";

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
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    setinput({ ...input, id: user._id });
    // eslint-disable-next-line
  }, [user]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendingChanges();
  };

  return (
    <div className="App">
      <div>
        {data.map((account) => {
          return (
            <Button
              onClick={() => {
                setUser(account);
              }}
              key={account._id}
            >
              {account.name} /{account.money}/{account.credit}
            </Button>
          );
        })}
      </div>
      <div>
        <Form
          handleSubmit={handleSubmit}
          selectedUser={user}
          selectType={(event) => {
            setType(event.target.value);
          }}
          amountChange={(event) => {
            const amount = +event.target.value;
            setinput({ ...input, amount: amount });
          }}
          transferIdChange={(event) => {
            setinput({ ...input, transferID: event.target.value });
          }}
          data={data}
        />
      </div>
    </div>
  );
}

export default App;
