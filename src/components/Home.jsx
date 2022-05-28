import React, { useState, useEffect } from 'react';
import Menu from './Menu/index.jsx'
export default function Home() {
  useEffect(() => {
    fetch('/api/products/all')
    .then(res => console.log(res.text()))
  }, [])
  return (
    <div>
      {Menu()}
      
    </div>
  );
}