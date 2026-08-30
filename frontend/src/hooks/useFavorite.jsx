import { useState } from "react";
import { favoriteApi } from "../api/favorite.api";

const useFavorite = ({
    entityType,
    entityId,
    initialValue = false,
}) => {
    const [isFavorite, setIsFavorite] =
        useState(initialValue);

    const [loading, setLoading] =
        useState(false);

    const toggleFavorite = async () => {
        if (!entityId || loading) {
            return {
                success: false,
                error: "Invalid favorite item",
            };
        }

        setLoading(true);

        try {
            if (isFavorite) {
                await favoriteApi.removeFavorite(
                    entityType,
                    entityId
                );

                setIsFavorite(false);

                return {
                    success: true,
                    isFavorite: false,
                };
            }

            await favoriteApi.addFavorite({
                entityType,
                entityId,
            });

            setIsFavorite(true);

            return {
                success: true,
                isFavorite: true,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to update favorite",
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        isFavorite,
        loading,
        toggleFavorite,
    };
};

export default useFavorite;