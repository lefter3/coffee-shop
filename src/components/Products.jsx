import React, { useState, useEffect } from 'react';
import Select from 'react-select'
export default function Products() {
  const categories = [
    { value: 'food', label: 'Food' },
    { value: 'drinks', label: 'Drinks' },
    { value: 'dessert', label: 'Dessert' }
  ]
  const [ingredient, setIngredient] = useState({
    name: "",
    amount: "",
  });
  const [ingredients, setIngredients] = useState({
    ingredients: []
  });
  const [product, setProduct] = useState({
    name: "",
    category: '',
    price: 0,
    ingredients: [],
  });

  useEffect(() => {
    try {
      fetch('/api/ingredients/all')
      .then(res => res.text())
      .then(res => setIngredients(JSON.parse(res).map((el) => ({value: el._id, label: el.name}))))
    } catch (e) {
      alert('Cannot get ingredients')
    }
  }, [])

  const handleIngredientChange = (event) => {
    setIngredient({ ...ingredient, [event.target.name]: event.target.value.toLowerCase() });
  };
  const handleProductChange = (event) => {
    if (event.target) setProduct({ ...product, [event.target.name]: event.target.value.toLowerCase() });
    // react select workaround
    else if (event.value) setProduct({ ...product, 'category': event.value.toLowerCase() });
    else setProduct({ ...product, ingredients: event.map(el => el.value) });
  };
  const sendData = async (url, body) => {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) 
    });
  }
  const handleIngredientSubmit = async (event) => {
    event.preventDefault();
    try {
      sendData('/api/ingredients/add', ingredient)
      .then(res => res.json())
      .then(res => {
        let foundIndex = ingredients.findIndex(x => x.name == res.name)
        if (foundIndex == -1) {
          setIngredients([...ingredients, {value: res._id, label: res.name}])
        }
      })
      setIngredient({ name: "", amount: 0, });
    } catch(err) {
      alert(err)
    }
  };
  const handleProductSubmit = async (event) => {
    event.preventDefault();
    try {
      sendData('/api/products/', product)
      .then(res => res.json())
      .then((res) => {
        if (res.ok){
          alert('Product added')
          setProduct({ name: "", category: null, ingredients: null, price: 0 });
        }
        
      }); 
    } catch (err) {
      alert(err)
    }
    
  };
  let productForm = () =>  { return(
    <div class="mx-auto	block p-6 m-3 rounded-lg shadow-lg bg-white max-w-sm w-3/4">
    <form onSubmit={handleProductSubmit} >
      <h1 class="text-3xl font-bold pt-8 lg:pt-0 mb-2">Add Product</h1>
      <div class="form-group mb-6">
        <label class="form-label inline-block mb-2 text-gray-700">Product</label>
        <input type="text" name="name" class="form-control block w-full px-3 py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={product.name}
          onChange={handleProductChange}
          />
      </div>
      <div class="form-group mb-6 grid grid-cols-2">
        <div class="p-3">
        <label class="form-label inline-block mb-2 text-gray-700">Category</label>
          <Select
            name="category"
            onChange={handleProductChange}
            options={categories} />
        </div>
        <div class="p-3">
          <label class="form-label inline-block mb-2 text-gray-700">Price</label>
          <input type="text" inputMode="numeric" pattern="[0-9]*" name="price" class="form-control block w-full px-3 py-1.5
            text-base
            font-normal  
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={product.price}
            onChange={handleProductChange}
          />
        </div>  
      </div>
      <div class="form-group mb-6">
        <label class="form-label inline-block mb-2 text-gray-700">Ingredients</label>
          <Select name="ingredients"
            onChange={handleProductChange}
            isMulti options={ingredients} />
      </div>
    
      <button type="submit" class="
        px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out">Submit</button>
    </form>
  </div>)
  }
  let ingredientForm = () =>  { return(
  <div class="mx-auto	block p-6 rounded-lg shadow-lg bg-white max-w-sm w-3/4">
  <form onSubmit={handleIngredientSubmit} >
    <h1 class="text-3xl font-bold pt-8 lg:pt-0 mb-2">Add or edit Ingredient</h1>
    <div class="form-group mb-6">
      <label for="exampleInputEmail1" class="form-label inline-block mb-2 text-gray-700">Ingredient</label>
      <input type="text" name="name" class="form-control block w-full px-3 py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        value={ingredient.name}
        onChange={handleIngredientChange}
        />
    </div>
    <div class="form-group mb-6">
      <label for="exampleInputPassword1" class="form-label inline-block mb-2 text-gray-700">Amount</label>
      <input type="number" name='amount' class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword1"
        placeholder="Amount" 
        value={ingredient.amount}
        onChange={handleIngredientChange} />
    </div>
  
    <button type="submit" class="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Submit</button>
  </form>
</div>)
}

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2'>
      {ingredientForm()}
      {productForm()}
    {/* test */}
    </div>
  );
}