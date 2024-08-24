import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  let [password, setPassword] = useState("");
  let [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [length, setLength] = useState(8);

  useEffect(() => {
    generatePassword();
  }, [length, isChar, isNumber]);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumber) str += "1234567890";
    if (isChar) str += "!@#$%^&*()_+{}[]?/`";
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [isChar, isNumber, length, setPassword]);

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <h1>PASSWORD GENERATOR</h1>
      <div className="container">
        <div className="input-bar">
          <input
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
            id="input-bar"
          />
          <button onClick={copyPassword}>Copy</button>
        </div>
        <div className="options">
          <div>
            <input
              type="range"
              value={length}
              min={8}
              max={100}
              onChange={(event) => setLength(event.target.value)}
            />
            <label>Length: ({length})</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={isNumber}
              onChange={() => setIsNumber((prev) => (prev = !prev))}
            />
            <label>Number</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={isChar}
              onChange={() => setIsChar((prev) => (prev = !prev))}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
