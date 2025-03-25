import { safeParse, pipe, transform, number, string, parse } from "valibot";
import {
  DrafProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import axios from "axios";
import { toBoolen } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DrafProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no válidos");
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getproductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);
    console.log(result);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updatedProduct(data: ProductData, id: Product["id"]) {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());

    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;

    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolen(data.availability.toString()),
    });

    await axios.put(url, result.output);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteproduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url)
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability (id: Product['id']){
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url)
  } catch (error) {
    console.log(error)
  }
}

