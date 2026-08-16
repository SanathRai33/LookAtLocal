import { useState } from 'react';
import { categoryApi } from '../api/category.api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCategories = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoryApi.getCategories(params);
      const data = response.data.data;
      setCategories(data);
      return { success: true, data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch categories';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getCategoryById = async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoryApi.getCategoryById(categoryId);
      return { success: true, data: response.data.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch category';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    getCategories,
    getCategoryById,
  };
};