import {useState} from "react";

const AddProduct = () => {

const [productData, setProductData] = useState({
    name: "",
    price: "",
    imageURL: "",
    description: ""
})

const handleChange = e => {
    const { id, value } = e.target 
    setProductData(form => {
        return{
            ...form,
            [id]: value
        }
    })
}

const handleSubmit = e => {
e.preventDefault()
console.log(productData)
const data = {
    ...productData,
    price: +productData.price
}


}

  return (
    <div className="product-form">
      <form className="form-group" onSubmit={handleSubmit}>
        <h1>Add a product</h1>
        <div>
          <label htmlFor="name" className="form-label">Name of the product</label>
          <input type="text" id="name" className="form-control" value={productData.name} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="price" className="form-label">Price of the product</label>
          <input type="number" id="price" className="form-control" value={productData.price} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="imageURL" className="form-label">Image of the product</label>
          <input type="text" id="imageURL" className="form-control" value={productData.imageURL} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="description" className="form-label">Description of the product</label>
          <textarea type="number" id="description" className="form-control" value={productData.description} onChange={handleChange}></textarea>
        </div>
        <button className="btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
