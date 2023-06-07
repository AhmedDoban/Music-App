import React, { useState, useEffect } from "react";
import Home from "./components/Home/Home";

function App() {
  const [Token, SetToken] = useState(false);
  useEffect(() => {}, [Token]);

  return (
    <div className="App">
      <Home Token={Token} SetToken={SetToken} />
    </div>
  );
}

export default App;
