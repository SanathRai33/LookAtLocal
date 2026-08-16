import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../../hooks/useServices';
import StepIndicator from './components/StepIndicator';
import StepCategory from './components/StepCategory';
import StepDetails from './components/StepDetails';
import StepPricingLocation from './components/StepPricingLocation';
import StepPreview from './components/StepPreview';

const CreateService = () => {
  const navigate = useNavigate();
  const { createService } = useServices();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    categoryId: '',
    categoryName: '',
    title: '',
    description: '',
    experienceYears: null,
    pricingType: '',
    price: '',
    isNegotiable: false,
    addressLine: '',
    locality: '',
    city: '',
    state: '',
    postalCode: '',
    latitude: null,
    longitude: null,
    images: [],
  });

  const steps = ['Category', 'Details', 'Pricing & Location', 'Preview'];

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (error) setError('');
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const submitData = new FormData();
      const fields = {
        categoryId: formData.categoryId,
        title: formData.title,
        description: formData.description,
        pricingType: formData.pricingType,
        price: formData.price,
        isNegotiable: formData.isNegotiable,
        city: formData.city,
        state: formData.state,
      };

      if (formData.experienceYears) {
        submitData.append('experienceYears', formData.experienceYears);
      }
      if (formData.addressLine) {
        submitData.append('addressLine', formData.addressLine);
      }
      if (formData.locality) {
        submitData.append('locality', formData.locality);
      }
      if (formData.postalCode) {
        submitData.append('postalCode', formData.postalCode);
      }
      if (formData.latitude) {
        submitData.append('latitude', formData.latitude);
      }
      if (formData.longitude) {
        submitData.append('longitude', formData.longitude);
      }

      Object.keys(fields).forEach((key) => {
        if (fields[key] !== null && fields[key] !== '' && fields[key] !== undefined) {
          submitData.append(key, fields[key]);
        }
      });

      formData.images.forEach((file) => {
        submitData.append('images', file);
      });

      const result = await createService(submitData);
      if (result.success) {
        navigate('/services/my-services');
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error creating service:', error);
      setError('Failed to create service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepCategory
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <StepDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 2:
        return (
          <StepPricingLocation
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <StepPreview
            formData={formData}
            onPrev={prevStep}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="w-full max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
            Create New Listing
          </h1>
          <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
            Fill in the details to post your listing to the community
          </p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="mt-8">{renderStep()}</div>
      </div>
    </div>
  );
};

export default CreateService;