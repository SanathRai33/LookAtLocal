import { useState } from 'react';
import { communityApi } from '../api/community.api';

export const useCommunity = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });

    const getCommunityPosts = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await communityApi.getCommunityPosts(filters);

            const data = response.data.data;
            const meta = response.data.meta;

            setPosts(Array.isArray(data) ? data : []);

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
                error.response?.data?.message ||
                'Failed to fetch posts';

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };

    const getCommunityPostById = async (postId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await communityApi.getCommunityPostById(postId);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch post';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const createCommunityPost = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await communityApi.createCommunityPost(data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create post';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateCommunityPost = async (postId, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await communityApi.updateCommunityPost(postId, data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update post';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteCommunityPost = async (postId) => {
        setLoading(true);
        setError(null);
        try {
            await communityApi.deleteCommunityPost(postId);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete post';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        posts,
        loading,
        error,
        pagination,
        getCommunityPosts,
        getCommunityPostById,
        createCommunityPost,
        updateCommunityPost,
        deleteCommunityPost,
    };
};