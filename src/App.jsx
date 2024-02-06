import { useCallback, useEffect, useState,useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Password Generator function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      console.log("numner")
      str += "0123456789";
      // console.log(str)
    }
    if (charAllowed) {
      console.log("char")
      str += "~!@#$%^&*()_+}{:?></*-+";
      // console.log(str)
    }
    for (let i = 1; i <= length; i++) {
      let chr = Math.floor(Math.random() *str.length + 1);
      // console.log(chr)
      let val = str.charAt(chr)
      pass += val;
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // useRef to select the xopied text
  let inputRef = useRef(null);
  const copyToClipboard = useCallback(()=>{
    inputRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  // useEffect to render the password genertor function time and again
  useEffect(()=>{
    passwordGenerator();
  },[numberAllowed,length,charAllowed,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
          <h1 className="text-center text-white my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" ref={inputRef} value={password} placeholder="Password" className="my-8 px-7 py-4 rounded-lg text-center"/>
          <button className="btn" onClick={copyToClipboard}>COPY</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 my-3">
            <input type="range" min={8} max={59} value={length} className="cursor-pointer" onChange={(e)=> setLength(e.target.value)}/>
            <label >Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1 my-3">
            <input type="checkbox" defaultChecked = {numberAllowed} onChange={()=>setNumberAllowed((prev)=> !prev)} />
            <label >Number</label>
          </div>
          <div className="flex items-center gap-x-1 my-3">
            <input type="checkbox" defaultChecked = {charAllowed} onChange={()=>setCharAllowed((prev)=> !prev)} />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
