import axios from "axios";
import { BACKEND_URL } from "../config/backend";

export const ITEM_API_BASE = BACKEND_URL + "/api/items";

// Get all items
const getItems = async () => {
  const response = await axios.get(ITEM_API_BASE);
  return response.data;
};

// Get single item
const getItem = async (itemId) => {
  const response = await axios.get(`${ITEM_API_BASE}/${itemId}`);
  return response.data;
};

// Create new item (no token required)
const createItem = async (itemData) => {
  const formData = new FormData();

  formData.append("name", itemData.name);
  formData.append("price", itemData.price);
  formData.append("description", itemData.description);
  formData.append("category", itemData.category);
  formData.append("stock", itemData.stock);
  formData.append("featured", itemData.featured);

  if (itemData.image) {
    formData.append("image", itemData.image);
  }

  const response = await axios.post(ITEM_API_BASE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update item (keep token if you want it admin-only)
const updateItem = async (itemId, itemData) => {
  const formData = new FormData();

  Object.keys(itemData).forEach((key) => {
    if (key === "image" && itemData.image instanceof File) {
      formData.append("image", itemData.image);
    } else if (key !== "image") {
      formData.append(key, itemData[key]);
    }
  });

  const response = await axios.put(`${ITEM_API_BASE}/${itemId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete item (keep token if you want it admin-only)
const deleteItem = async (itemId) => {
  const response = await axios.delete(`${ITEM_API_BASE}/${itemId}`);
  return response.data;
};

const itemService = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};

export default itemService;
