import "./App.css";
import { useEffect, useState } from "react";
import apiInstance from "./api/api";

function App() {
  const [data, setData] = useState();
  async function getdata() {
    const { data } = await apiInstance.get(`/users`);
    setData(data);
  }
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="App">
      {data.map((account) => {
        return (
          <div>
            {account.name} /{account.money}/{account.credit}
          </div>
        );
      })}
    </div>
  );
}

export default App;
