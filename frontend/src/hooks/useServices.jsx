import { useState } from 'react';
import { serviceApi } from '../api/service.api';

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const getServices = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await serviceApi.getServices(filters);
      const { data, meta } = response.data;
      setServices(data);
      if (meta) {
        setPagination(meta);
      }
      return { success: true, data, meta };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch services';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getMyServices = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await serviceApi.getMyServices(filters);
      const { data, meta } = response.data;
      setServices(data);
      if (meta) {
        setPagination(meta);
      }
      return { success: true, data, meta };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch your services';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getServiceById = async (serviceId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await serviceApi.getServiceById(serviceId);
      return { success: true, data: response.data.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch service';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const createService = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await serviceApi.createService(formData);
      return { success: true, data: response.data.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create service';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (serviceId, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await serviceApi.updateService(serviceId, data);
      return { success: true, data: response.data.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update service';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId) => {
    setLoading(true);
    setError(null);
    try {
      await serviceApi.deleteService(serviceId);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete service';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    loading,
    error,
    pagination,
    getServices,
    getMyServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
  };
};