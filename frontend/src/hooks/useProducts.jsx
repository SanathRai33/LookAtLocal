import { useState } from 'react';
import { productApi } from '../api/product.api';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });

    const getProducts = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await productApi.getProducts(filters);

            const data = response.data.data;
            const meta = response.data.meta;

            setProducts(data);

            if (meta) {
                setPagination(meta);
            }

            return {
                success: true,
                data,
                meta,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Failed to fetch products';

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };

    const getMyProducts = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await productApi.getMyProducts(filters);

            const data = response.data.data;
            const meta = response.data.meta;

            setProducts(data);

            if (meta) {
                setPagination(meta);
            }

            return {
                success: true,
                data,
                meta,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || 'Failed to fetch your products';

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };

    const getProductById = async (productId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productApi.getProductById(productId);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch product';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productApi.createProduct(formData);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create product';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (productId, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productApi.updateProduct(productId, data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update product';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        setLoading(true);
        setError(null);
        try {
            await productApi.deleteProduct(productId);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete product';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        loading,
        error,
        pagination,
        getProducts,
        getMyProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};