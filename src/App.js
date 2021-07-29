import { useState, useEffect } from "react";
import "./App.css";

import Form from "./components/Form";
import useAccesstoken from "./hooks/useAccesstoken";

function App() {
  const [accesstoken, setAccesstoken] = useState("");
  const token = useAccesstoken();
  useEffect(() => setAccesstoken(token), [token]);

  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
