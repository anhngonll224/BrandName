import http from "../index"
import {
  apiGetAllProductInCart,
  apiAddProductToCart,
  apiDeleteProductInCart,
} from "./urls"

const getAllProductInCart = () => http.get(apiGetAllProductInCart)
const addProductToCart = body => http.post(apiAddProductToCart, body)
const deleteProductInCart = data =>
  http.delete(apiDeleteProductInCart, { data })

const CartService = {
  getAllProductInCart,
  addProductToCart,
  deleteProductInCart,
}
export default CartService
