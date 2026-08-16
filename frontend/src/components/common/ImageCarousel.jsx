import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({
    images = [],
    alt = 'Listing image',
    heightClass = 'h-64',
    objectFit = 'contain',
}) => {
    const [currentImage, setCurrentImage] = useState(0);

    const imageList = Array.isArray(images) ? images : [];

    const getImageUrl = (image) => {
        if (!image) return null;

        if (typeof image === 'object') {
            return image.imageUrl || image.url || null;
        }

        if (typeof image === 'string') {
            return image;
        }

        return null;
    };

    const nextImage = () => {
        if (imageList.length <= 1) return;

        setCurrentImage(
            (prev) => (prev + 1) % imageList.length
        );
    };

    const previousImage = () => {
        if (imageList.length <= 1) return;

        setCurrentImage(
            (prev) =>
                prev === 0
                    ? imageList.length - 1
                    : prev - 1
        );
    };

    const selectImage = (index) => {
        setCurrentImage(index);
    };

    const currentImageUrl = getImageUrl(
        imageList[currentImage]
    );

    if (!imageList.length || !currentImageUrl) {
        return (
            <div
                className={`relative ${heightClass} overflow-hidden bg-gray-100 dark:bg-slate-700`}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <span className="text-gray-400 dark:text-gray-500">
                        No image available
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`relative ${heightClass} overflow-hidden bg-gray-100 dark:bg-slate-700`}
        >
            <img
                src={currentImageUrl}
                alt={`${alt} - Image ${currentImage + 1}`}
                className={`w-full h-full transition-opacity duration-300 ${objectFit === 'cover'
                        ? 'object-cover'
                        : 'object-contain'
                    }`}
            />

            {imageList.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={previousImage}
                        aria-label="Previous image"
                        className="absolute flex items-center justify-center text-white transition -translate-y-1/2 rounded-full left-3 top-1/2 w-9 h-9 bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        onClick={nextImage}
                        aria-label="Next image"
                        className="absolute flex items-center justify-center text-white transition -translate-y-1/2 rounded-full right-3 top-1/2 w-9 h-9 bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="absolute px-3 py-1 text-xs font-medium text-white -translate-x-1/2 rounded-full bottom-3 left-1/2 bg-black/60 backdrop-blur-sm">
                        {currentImage + 1} / {imageList.length}
                    </div>

                    <div className="absolute flex gap-1.5 -translate-x-1/2 bottom-3 left-1/2">
                        {imageList.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => selectImage(index)}
                                aria-label={`View image ${index + 1}`}
                                className={`h-1.5 rounded-full transition-all ${currentImage === index
                                        ? 'w-5 bg-white'
                                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageCarousel;