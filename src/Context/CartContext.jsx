import { createContext } from "react";
export const CartContext = createContext(null);
import { useState,useEffect } from "react";
import AuthToken  from "../Api/ApiAuthToken";




const CartContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([0]);
  const getItems = async () => {
    const { data } = await AuthToken.get(`/Carts`);
    setCartItems(data.cartResponse.length);
    
  }
  useEffect(() => {
    getItems();
  }, []);

  return <CartContext.Provider value={{cartItems,setCartItems}}>
    {children}
  </CartContext.Provider>
}


export default CartContextProvider;

