import {React, useEffect, useState, } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

function ProductsPage() {
  const { id } = useParams('id');
  console.log(id);
const [data, setData] = useState({});

  const getByid = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`);
    console.log(data);
      const title = document.getElementById('title');
  title.innerHTML =  data.name;
  setData(data);
  }

  useEffect(() => {
    getByid();
  }, []);
  return (
    <div>{data.mainImg}
     </div>
  )
}

export default ProductsPage