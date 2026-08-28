import { useCallback, useState } from "react";
import jobApplicationApi from "../api/job-application.api";

const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

const useJobApplication = () => {
    const [applications, setApplications] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] =
        useState(false);
    const [error, setError] = useState("");

    const createApplication = async (data) => {
        setLoading(true);
        setError("");

        try {
            const response =
                await jobApplicationApi.createApplication(
                    data
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Job application submitted successfully",
            };
        } catch (error) {
            const message =
                getErrorMessage(error);

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setLoading(false);
        }
    };

    const getMyApplications = useCallback(
        async (params = {}) => {
            setLoading(true);
            setError("");

            try {
                const response =
                    await jobApplicationApi.getMyApplications(
                        params
                    );

                const data =
                    response.data?.data;

                setApplications(
                    data?.applications || []
                );

                setPagination(
                    data?.pagination || null
                );

                return {
                    success: true,
                    data,
                };
            } catch (error) {
                const message =
                    getErrorMessage(error);

                setError(message);

                return {
                    success: false,
                    error: message,
                };
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const getReceivedApplications =
        useCallback(async (params = {}) => {
            setLoading(true);
            setError("");

            try {
                const response =
                    await jobApplicationApi.getReceivedApplications(
                        params
                    );

                const data =
                    response.data?.data;

                setApplications(
                    data?.applications || []
                );

                setPagination(
                    data?.pagination || null
                );

                return {
                    success: true,
                    data,
                };
            } catch (error) {
                const message =
                    getErrorMessage(error);

                setError(message);

                return {
                    success: false,
                    error: message,
                };
            } finally {
                setLoading(false);
            }
        }, []);

    const getApplicationById = async (
        applicationId
    ) => {
        try {
            const response =
                await jobApplicationApi.getApplicationById(
                    applicationId
                );

            return {
                success: true,
                data: response.data?.data,
            };
        } catch (error) {
            return {
                success: false,
                error: getErrorMessage(error),
            };
        }
    };

    const performAction = async (action) => {
        setActionLoading(true);
        setError("");

        try {
            const response = await action();

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message,
            };
        } catch (error) {
            const message =
                getErrorMessage(error);

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setActionLoading(false);
        }
    };

    const reviewApplication = async (
        applicationId
    ) =>
        performAction(() =>
            jobApplicationApi.reviewApplication(
                applicationId
            )
        );

    const shortlistApplication = async (
        applicationId
    ) =>
        performAction(() =>
            jobApplicationApi.shortlistApplication(
                applicationId
            )
        );

    const acceptApplication = async (
        applicationId
    ) =>
        performAction(() =>
            jobApplicationApi.acceptApplication(
                applicationId
            )
        );

    const rejectApplication = async (
        applicationId
    ) =>
        performAction(() =>
            jobApplicationApi.rejectApplication(
                applicationId
            )
        );

    const withdrawApplication = async (
        applicationId
    ) =>
        performAction(() =>
            jobApplicationApi.withdrawApplication(
                applicationId
            )
        );

    return {
        applications,
        pagination,
        loading,
        actionLoading,
        error,

        createApplication,
        getMyApplications,
        getReceivedApplications,
        getApplicationById,

        reviewApplication,
        shortlistApplication,
        acceptApplication,
        rejectApplication,
        withdrawApplication,
    };
};

export default useJobApplication;