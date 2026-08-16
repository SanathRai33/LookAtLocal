import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import StepIndicator from './components/StepIndicator';
import StepCategory from './components/StepCategory';
import StepDetails from './components/StepDetails';
import StepPricingLocation from './components/StepPricingLocation';
import StepPreview from './components/StepPreview';

const CreateJob = () => {
  const navigate = useNavigate();
  const { createJob } = useJobs();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    categoryId: '',
    categoryName: '',
    title: '',
    description: '',
    companyName: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    salaryType: '',
    benefits: '',
    experienceRequired: '',
    vacancies: 1,
    addressLine: '',
    locality: '',
    city: '',
    state: '',
    postalCode: '',
    latitude: null,
    longitude: null,
    applicationDeadline: '',
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
      const submitData = {
        categoryId: formData.categoryId,
        title: formData.title,
        description: formData.description,
        companyName: formData.companyName,
        jobType: formData.jobType,
        salaryMin: formData.salaryMin || undefined,
        salaryMax: formData.salaryMax || undefined,
        salaryType: formData.salaryType || undefined,
        benefits: formData.benefits || undefined,
        experienceRequired: formData.experienceRequired || undefined,
        vacancies: formData.vacancies || 1,
        addressLine: formData.addressLine || undefined,
        locality: formData.locality || undefined,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode || undefined,
        latitude: formData.latitude ?? undefined,
        longitude: formData.longitude ?? undefined,
        applicationDeadline:
          formData.applicationDeadline || undefined,
      };

      console.log('Submitting job:', submitData);

      const result = await createJob(submitData);

      if (result.success) {
        navigate('/jobs/my-jobs');
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error creating job:', error);
      setError('Failed to create job. Please try again.');
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
            Post a Job
          </h1>
          <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
            List your job opportunity in the community
          </p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="mt-8">{renderStep()}</div>
      </div>
    </div>
  );
};

export default CreateJob;