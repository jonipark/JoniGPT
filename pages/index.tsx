import { useState, useEffect } from "react";

export default function Home() {
  const axios = require('axios');
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState([''])

  const submit = (prompt: string) => {
    const key = "" // your key
    const endPoint = "https:/api.openai.com/v1/completions"

    axios.post(endPoint, {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.8   // 0(safe) - 1(creative)
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        }
    }).then((res: { data: any; }) => {
      setResult(res.data.choices[0].text);
      setHistory([...history, 
        `My input: ${prompt} \n GPT-3 output: ${res.data.choices[0].text}`
      ]);
    });
  }

  const containerStyle:React.CSSProperties = {
    paddingTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headingStyle:React.CSSProperties = {
    fontSize: '2rem',
  };

  const descStyle:React.CSSProperties = {
    paddingTop: '8px',
    paddingBottom: '32px',
    fontSize: '1rem',
  };

  const inputStyle:React.CSSProperties = {
    width: '400px',
    height: '50px',
    padding: '8px',
  };

  const buttonStyle:React.CSSProperties = {
    width: '80px',
    marginTop: '12px',
    marginLeft: '20px',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: 'purple',
  };

  const resultStyle:React.CSSProperties = {
    marginTop: '32px',
    width: '500px',
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const historyContainerStyle:React.CSSProperties = {
    paddingTop: '60px',
    paddingBottom: '60px',
    width: '500px',
  };

  const historyStyle:React.CSSProperties = {
    paddingTop: '12px',
  };
  

  return (
    <>
      <div style={containerStyle}>
          <div style={headingStyle}>👾 Welcome to Joni GPT</div>
          <div style={descStyle}>Compose your request and receive an intelligent response from GPT</div>
          <div>
            <input style={inputStyle} onChange={e => setPrompt(e.target.value)}/>
            <button style={buttonStyle} onClick={e => submit(prompt)}>Ask GPT!</button>
          </div>
          <div style={resultStyle}>🦾🤖🦿: {result}</div>
          <div style={historyContainerStyle}>{history.map((h, i) => (i!==0)? <div style={historyStyle} key={i}> {i}<br/> {h}</div>: null)}</div>
      </div>
    </>
  )
}
