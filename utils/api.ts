import axios from 'axios';
import { Product } from '@/types/product';





export const fetchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const response = await fetch(
      `http://localhost:3002/search_material_un?query=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: typeof window !== 'undefined' ? document.cookie : '',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.results)) {
      throw new Error('Invalid response format');
    }

    return data.results.map((item: any) => ({
      id: item._id || '',
      name: item.name || '',
      price: item.price || 0,
      type_material: item.type_material || '',
      url: item.url || '',
      color: item.color || '',
      plot_embedding: item.plot_embedding || [],
    }));
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}