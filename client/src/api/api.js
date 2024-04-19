import axios from "axios";

export default async function productsData() {
  const response = await axios.get("https://fakestoreapi.com/products");
  if (response.status === 200) {
    return response;
  } else {
    console.log("error");
  }
}
