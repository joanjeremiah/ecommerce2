import {useState,useRef,useEffect} from 'react'

export default function Dashboard() {
  const [productDetails,setProductDetails] = useState({});
  const [msg,setMsg] = useState('');
  const message = useRef(null);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(productDetails)

    const response = await fetch('api/product/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productDetails)
  });
    const res = await response.json()
    console.log(response)
    console.log(res)
    if(res.msg){
      setMsg(res.msg)
      if(message && message.current){
        message.current.style.transform = 'translateX(0)';
        setTimeout(() => {
          message.current.style.transform = 'translateX(100%)';
        },3000)
      }
    }
  }

  const onFieldInput = (e) => {
    // console.log(productDetails)
    setProductDetails({
        ...productDetails,
        [e.target.name] : e.target.value
    })
    
  }
  return (
    <form onSubmit={onFormSubmit} className="add-product-form">
      <p ref={message} className="message">{msg}</p>
      <input type="text" value={productDetails.name} onInput={onFieldInput} placeholder="Name" name="name" />
      <input type="text" value={productDetails.category} onInput={onFieldInput} placeholder="Category" name="category" />
      <input type="text" value={productDetails.price} onInput={onFieldInput} placeholder="Price" name="price" />
      <input type="text" value={productDetails.qty} onInput={onFieldInput} placeholder="Quantity" name="qty" />
      <textarea type="text" value={productDetails.description} onInput={onFieldInput} placeholder="Description" name="description" />
      <input type="text" value={productDetails.image} onInput={onFieldInput} placeholder="Product Image source" name="image"  />
      <input type="submit" value="Add product" />
    </form>
  )
}
