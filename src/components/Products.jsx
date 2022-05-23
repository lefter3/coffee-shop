import React, { useState } from 'react';

export default function Home() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch('/api/home')
    .then(res => res.text())
    .then(res => this.setCount(res, []))
  })
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}