import { useState } from 'react';
import { jobApi } from '../api/job.api';

export const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });

    const getJobs = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await jobApi.getJobs(filters);
            const data = response.data.data || [];
            const meta = response.data.pagination || response.data.meta;

            setJobs(data);

            if (meta) {
                setPagination(meta);
            }

            return {
                success: true,
                data,
                meta,
            };
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch jobs";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };


    const getMyJobs = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await jobApi.getMyJobs(filters);
            const data = response.data.data || [];
            const meta = response.data.pagination || response.data.meta;

            setJobs(data);

            if (meta) {
                setPagination(meta);
            }

            return {
                success: true,
                data,
                meta,
            };
        } catch (error) {
            console.error("GET MY JOBS ERROR:", error.response?.data || error);

            const errorMessage = error.response?.data?.message || "Failed to fetch your jobs";
            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };

    const getJobById = async (jobId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await jobApi.getJobById(jobId);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch job';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const createJob = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await jobApi.createJob(data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create job';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateJob = async (jobId, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await jobApi.updateJob(jobId, data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update job';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (jobId) => {
        setLoading(true);
        setError(null);
        try {
            await jobApi.deleteJob(jobId);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete job';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        jobs,
        loading,
        error,
        pagination,
        getJobs,
        getMyJobs,
        getJobById,
        createJob,
        updateJob,
        deleteJob,
    };
};