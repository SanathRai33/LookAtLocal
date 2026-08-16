import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

const ImageUpload = ({ images, onImagesChange }) => {
    const fileInputRef = useRef(null);
    const [dragOver, setDragOver] = useState(false);
    const [errors, setErrors] = useState([]);

    const validateFiles = (files) => {
        const maxSize = 5 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const newErrors = [];

        Array.from(files).forEach((file) => {
            if (!allowedTypes.includes(file.type)) {
                newErrors.push(`${file.name}: Only JPG, PNG, and WEBP are supported`);
            }
            if (file.size > maxSize) {
                newErrors.push(`${file.name}: Maximum file size is 5MB`);
            }
        });

        return newErrors;
    };

    const handleFiles = (files) => {
        const fileArray = Array.from(files);
        const validationErrors = validateFiles(fileArray);

        if (validationErrors?.length > 0) {
            setErrors(validationErrors);
            setTimeout(() => setErrors([]), 5000);
            return;
        }

        const currentImages = images || [];
        const newImages = [...currentImages, ...fileArray];

        if (newImages?.length > 5) {
            setErrors(['Maximum 5 images allowed']);
            setTimeout(() => setErrors([]), 5000);
            return;
        }

        onImagesChange(newImages);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleFileSelect = (e) => {
        handleFiles(e.target.files);
        e.target.value = '';
    };

    const removeImage = (index) => {
        const newImages = images?.filter((_, i) => i !== index);
        onImagesChange(newImages);
    };

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Photos / Images</label>

            <div
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${dragOver
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                        : 'border-gray-300 hover:border-gray-400 dark:border-slate-700 dark:hover:border-slate-600'
                    }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="p-3 bg-gray-100 rounded-full dark:bg-slate-800">
                            <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Drop images here or click to upload</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Supports JPG, PNG, WEBP — Max 5MB each</p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Maximum 5 images</p>
                </div>
            </div>

            {errors?.length > 0 && (
                <div className="mt-2 space-y-1">
                    {errors?.map((error, index) => (
                        <p key={index} className="text-sm text-red-500">{error}</p>
                    ))}
                </div>
            )}

            {images && images?.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4 sm:grid-cols-5">
                    {images?.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload ${index + 1}`}
                                className="object-cover w-full h-24 rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/50 text-white text-xs">
                                {Math.round(image.size / 1024)} KB
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;