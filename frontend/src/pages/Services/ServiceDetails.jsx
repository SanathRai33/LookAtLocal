import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Phone,
  Clock,
  IndianRupee,
  ChevronLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useServices } from '../../hooks/useServices';
import ProviderCard from '../../components/common/ProviderCard';
import ImageCarousel from '../../components/common/ImageCarousel';
import SimilarServices from './components/SimilarServices';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { getServiceById, loading } = useServices();
  const [service, setService] = useState(null);
  const [error, setError] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    const result = await getServiceById(serviceId);
    if (result.success) {
      setService(result.data);
    } else {
      setError(result.error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  };

  const getPricingLabel = (type) => {
    const types = {
      HOURLY: '/hour',
      DAILY: '/day',
      FIXED: '',
    };
    return types[type] || '';
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const handleCall = () => {
    const phoneNumber = provider?.phone || '';
    if (phoneNumber) {
      const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
      window.location.href = `tel:${cleanNumber}`;
    } else {
      alert('Phone number not available for this provider');
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = provider?.phone || '';

    if (!phoneNumber) {
      alert('WhatsApp number not available for this provider');
      return;
    }

    let cleanNumber = phoneNumber.replace(/\D/g, '');

    if (cleanNumber.length === 10) {
      cleanNumber = `91${cleanNumber}`;
    }

    if (cleanNumber.startsWith('0')) {
      cleanNumber = `91${cleanNumber.slice(1)}`;
    }

    const message = encodeURIComponent(
      `Hi, I'm interested in your service: ${service?.title || ''}`
    );

    window.open(
      `https://wa.me/${cleanNumber}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Service not found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{error || 'The service you are looking for does not exist.'}</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const provider = service.provider || {};
  const hasPhone = !!provider?.phone;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <button
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Services
        </button>

        <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white shadow-sm rounded-2xl dark:bg-slate-800">
              <ImageCarousel
                images={service.images}
                alt={service.title}
                heightClass="h-72"
                objectFit="cover"
              />

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {service.category?.name || 'Service'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      <IndianRupee className="inline w-5 h-5" />
                      {service.price}{getPricingLabel(service.pricingType)}
                    </div>
                    {service.isNegotiable && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">
                        Negotiable
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {service.city}, {service.state}
                  </div>
                  {service.locality && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      • {service.locality}
                    </span>
                  )}
                  {service.averageRating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {service.averageRating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({service.reviewCount} reviews)
                      </span>
                    </div>
                  )}
                  {service.experienceYears && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {service.experienceYears} years exp.
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Description
                  </h3>
                  <div className="mt-2">
                    <p className={`text-sm text-gray-600 dark:text-gray-300 ${!showFullDescription ? 'line-clamp-4' : ''}`}>
                      {service.description}
                    </p>
                    {service.description && service.description.length > 200 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {showFullDescription ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>
                </div>

                {service.addressLine && (
                  <div className="p-4 mt-4 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Address:</span> {service.addressLine}
                    </p>
                  </div>
                )}

                {service.isAvailable && service.status === 'ACTIVE' && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={handleCall}
                      disabled={!hasPhone}
                      className={`flex items-center gap-2 px-6 py-3 text-white transition rounded-xl hover:shadow-lg hover:shadow-blue-500/25 ${hasPhone
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                      <Phone className="w-5 h-5" />
                      {hasPhone ? 'Call Now' : 'No Phone Number'}
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      // disabled={!hasPhone}
                      className={`flex items-center gap-2 px-6 py-3 text-white transition rounded-xl ${hasPhone
                        ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      {hasPhone ? 'WhatsApp' : 'No Phone Number'}
                    </button>
                    {/* <button className="flex items-center gap-2 px-6 py-3 text-gray-700 transition bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600">
                      <MessageSquare className="w-5 h-5" />
                      Send Message
                    </button> */}
                  </div>
                )}

                {service.reviewCount > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Reviews ({service.reviewCount})
                    </h3>
                    <div className="mt-3 space-y-3">
                      {[1, 2].map((_, index) => (
                        <div key={index} className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-blue-600 rounded-full">
                                {getInitials('User')}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">User {index + 1}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium text-gray-900 dark:text-white">5.0</span>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Great service! Highly recommended.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProviderCard user={provider} roleLabel="Service Provider" providingSince={service?.createdAt} isPhoneVerified={provider?.isPhoneVerified}
              isEmailVerified={provider?.isEmailVerified} isTopRated={service?.averageRating > 4.5} profilePath={`/users/${provider.id}`}
            />

            <SimilarServices services={service.similarServices} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;