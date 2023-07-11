// import logo from './logo.svg';
import './App.css';
import { ADD, CREATE, DELETE, UPDATE, REPLACE } from './components/reducer';
import { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from './components/axios';
function App() {
  // store
  const dispatch = useDispatch();
  let cartData = useSelector((state) => state.cart.cart);
  // states
  const [selectedOption, setSelectedOption] = useState('');
  const [text, setText] = useState();
  const [id, setId] = useState();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    rating: '',
    stock: '',
    thumbnail: ''
  });
  const [form, setForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [updateValue, setUpdateValue] = useState('');
  const [createReplace, setCreateReplace] = useState()
  // getdata from api
  const getData = async () => {
    try {
      const response = await axios.get("/products")
      dispatch(ADD(response.data.products));
    } catch (err) {
      console.log(err);
    }
  }
  const createData = () => {
    setCreateReplace(true)
    setForm(true);
  }
  const deleteData = (cartId) => {
    dispatch(DELETE(cartId));
  }
  const updateData = (cartId) => {
    setId(cartId)
    setUpdateForm(true);
  }
  const replaceData = (cartId) => {
    setId(cartId)
    setForm(true);
    setCreateReplace(false);
  }
  const cancelForm = () => {
    setForm(false);
  }
  const handelChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "title" || "thumbnail" ? value : Number(value)
    setFormData({
      ...formData,
      [name]: newValue
    });
  }
  console.log("formData", formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.rating || !formData.stock || !formData.thumbnail) {
      setText("All fields are required!");
    }
    else {
      if (createReplace) {
        dispatch(CREATE(formData))
      }
      else {
        dispatch(REPLACE({ id: id, formData: formData }))
      }
      setForm(false)
    }
  }
  const handleSelectChange = (e) => {
    // setUpdateForm(false)
    setSelectedOption(e.target.value);
  }
  const handleUpdateChange = (e) => {
    setUpdateValue(e.target.value)
  }
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(UPDATE({ id: id, selectedOption: selectedOption, updateValue: updateValue }))
    setUpdateForm(false);
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="App m-5">
      <h1 className='text-xl'>PERFORM CRUD OPERATION USING REDUX_TOOLKIT</h1>
      <h2 className='text-xl'><b>Tech:-</b> html, css, javascript, react, tailwindcss, redux, redux-toolkit, axios, jsonplaceholder</h2>
      <button className='mt-5 bg-blue-500 text-white rounded focus:ring hover:bg-blue-600 py-0.5 px-2' onClick={() => createData()}>Create Products</button>
      <div className='relative flex flex-wrap justify-center items-center gap-10 mt-10'>
        {cartData && cartData.map((item, index) => (
          <div key={index} className='bg-zinc-100 flex flex-col w-80 hover:shadow-2xl'>
            <img className='h-48 w-96' src={item.thumbnail} alt="image_thumb" height={200} width={300} />
            <p className='flex justify-between px-3 items-center'><b>Id:</b><span>{item.id}</span></p>
            <p className='flex justify-between px-3 items-center'><b>Title:</b><span>{item.title}</span></p>
            <p className='flex justify-between px-3 items-center'><b>Price:</b><span>{item.price}</span></p>
            <p className='flex justify-between px-3 items-center'><b>Rating:</b><span>{item.rating}</span></p>
            <p className='flex justify-between px-3 items-center'><b>Stock:</b><span>{item.stock}</span></p>
            <div className='flex gap-2 justify-center items-center p-3'>
              <button className='bg-blue-500 text-white rounded focus:ring hover:bg-blue-600 py-0.5 px-2' onClick={() => deleteData(item.id)}>Delete</button>
              <button className='bg-blue-500 text-white rounded focus:ring hover:bg-blue-600 py-0.5 px-2' onClick={() => updateData(item.id)}>Update</button>
              <button className='bg-blue-500 text-white rounded focus:ring hover:bg-blue-600 py-0.5 px-2' onClick={() => replaceData(item.id)}>Replace</button>
            </div>
          </div>
        ))}
        {form ? (<div className='flex flex-col justify-center items-center fixed top-20 left-50 h-auto py-5 bg-red-200 left-50 w-96'>
          <h1 className='text-2xl py-2'>Input Fields Are Required!</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 justify-center items-center'>
            <input type='text' className='w-80 p-2' name='id' placeholder='Enter Id*' onChange={handelChange} />
            <input type='text' className='w-80 p-2' name='title' placeholder='Enter Title*' onChange={handelChange} />
            <input type='text' className='w-80 p-2' name='price' placeholder='Enter Price*' onChange={handelChange} />
            <input type='text' className='w-80 p-2' name='rating' placeholder='Enter Rating*' onChange={handelChange} />
            <input type='text' className='w-80 p-2' name='stock' placeholder='Enter Stocks*' onChange={handelChange} />
            <input type='url' className='w-80 p-2' name='thumbnail' placeholder='Enter Image Url*' onChange={handelChange} />
            <p className='text-red-400'>{text}</p>
            <div className='flex gap-5'>
              <button className='bg-blue-100 w-40 py-2' type='submit'>Submit</button>
              <button className='bg-blue-100 w-40 py-2' onClick={cancelForm}>Cancel</button>
            </div>
          </form>
        </div>) : null}
        {
          updateForm ? (<div className='flex flex-col justify-center items-center fixed top-20 left-50 h-auto py-5 bg-red-200 left-50 w-96'>
            <h1 className='font-bold mb-2'>Select and Enter Value Which you want update!</h1>
            <form onSubmit={handleUpdateSubmit} className='flex flex-col gap-3 justify-center items-center'>
              <select className='px-3 py-2' value={selectedOption} onChange={handleSelectChange}>
                <option value=''>Select an option</option>
                <option value='thumbnail'>Image</option>
                <option value='id'>Id</option>
                <option value='title'>Title</option>
                <option value='price'>Price</option>
                <option value='rating'>Rating</option>
                <option value='stock'>Stock</option>
              </select>
              {selectedOption === 'thumbnail' ?
                (<input className='p-2' type='url' placeholder='Enter url...*' onChange={handleUpdateChange} />) :
                selectedOption === 'id' ?
                  (<input className='p-2' type='text' placeholder='Enter id...*' onChange={handleUpdateChange} />) :
                  selectedOption === 'title' ?
                    (<input className='p-2' type='text' placeholder='Enter title...*' onChange={handleUpdateChange} />) :
                    selectedOption === 'price' ?
                      (<input className='p-2' type='text' placeholder='Enter price...*' onChange={handleUpdateChange} />) :
                      selectedOption === 'rating' ?
                        (<input className='p-2' type='text' placeholder='Enter rating...*' onChange={handleUpdateChange} />) :
                        selectedOption === 'stock' ?
                          (<input className='p-2' type='text' placeholder='Enter stock...*' onChange={handleUpdateChange} />) : null
              }
              <button className='bg-blue-100 w-40 py-2' type='submit'>Update</button>
            </form>
          </div>) : null
        }
      </div>
    </div>
  );
}

export default App;
