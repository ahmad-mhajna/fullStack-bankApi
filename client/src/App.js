import "./App.css";
import { useEffect, useState } from "react";
import apiInstance from "./api/api";
import Button from "./components/Button/Button";
import Form from "./components/form/form";

function App() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [user, setUser] = useState({});
  const [targetUser, setTargetUser] = useState({});
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
    if (input.transferID !== "")
      setTargetUser(data.find((user) => user._id === input.transferID));
    else setTargetUser({});
    // eslint-disable-next-line
  }, [input]);

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
      <div className="accounts">
        {data.map((account) => {
          return (
            <Button
              onClick={() => {
                setUser(account);
                setinput({ ...input, transferID: "" });
              }}
              key={account._id}
            >
              <p> name : {account.name}</p>
              <p> money : {account.money}</p>
              <p> credit :{account.credit}</p>
            </Button>
          );
        })}
      </div>
      <div className="Form">
        <Form
          targetUser={targetUser}
          handleSubmit={handleSubmit}
          selectedUser={user}
          selectType={(event) => {
            setType(event.target.value);
            setinput({ ...input, transferID: "" });
          }}
          amountChange={(event) => {
            const amount = +event.target.value;
            setinput({ ...input, amount: amount });
          }}
          transferIdChange={(event) => {
            setinput({ ...input, transferID: event.target.value });
          }}
          data={data}
          type={type}
        />
      </div>
    </div>
  );
}

export default App;
