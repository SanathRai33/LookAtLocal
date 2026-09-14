import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  CheckCircle,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Package,
  Users,
  Square,
  Building,
} from 'lucide-react';
import { useSpaces } from '../../hooks/useSpaces';
import { useAuth } from '../../context/AuthContext';
import { FaWhatsapp } from 'react-icons/fa';
import SpaceUnitCard from './components/SpaceUnitCard';
import ImageCarousel from '../../components/common/ImageCarousel';
import ProviderCard from '../../components/common/ProviderCard';
import RelatedSpaces from './components/RelatedSpaces';
import SEO from '../../components/SEO/SEO';

const SpaceDetails = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getSpaceById, loading } = useSpaces();
  const [space, setSpace] = useState(null);
  const [error, setError] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetchSpaceDetails();
  }, [spaceId]);

  const fetchSpaceDetails = async () => {
    const result = await getSpaceById(spaceId);
    if (result.success) {
      setSpace(result.data);
    } else {
      setError(result.error);
    }
  };



  const getSpaceTypeLabel = (type) => {
    const labels = {
      SHOP: 'Shop',
      OFFICE: 'Office',
      ROOM: 'Room',
      PG: 'PG',
      WAREHOUSE: 'Warehouse',
      PARKING: 'Parking'
    };
    return labels[type] || type;
  };

  const getSpaceTypeIcon = (type) => {
    const icons = {
      SHOP: <Building className="w-4 h-4" />,
      OFFICE: <Building className="w-4 h-4" />,
      ROOM: <Square className="w-4 h-4" />,
      PG: <Users className="w-4 h-4" />,
      WAREHOUSE: <Package className="w-4 h-4" />,
      PARKING: <Square className="w-4 h-4" />
    };
    return icons[type] || <Building className="w-4 h-4" />;
  };

  const handleCall = () => {
    const phoneNumber = user?.phone || '';
    if (phoneNumber) {
      const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
      window.location.href = `tel:${cleanNumber}`;
    } else {
      alert('Phone number not available');
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = user?.phone || '';
    if (!phoneNumber) {
      alert('WhatsApp number not available');
      return;
    }
    let cleanNumber = phoneNumber.replace(/\D/g, '');
    if (cleanNumber?.length === 10) {
      cleanNumber = `91${cleanNumber}`;
    }
    if (cleanNumber.startsWith('0')) {
      cleanNumber = `91${cleanNumber.slice(1)}`;
    }
    const message = encodeURIComponent(
      `Hi, I'm interested in: ${space?.title || ''}`
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
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading space details...</p>
        </div>
      </div>
    );
  }

  if (error || !space) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Space not found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{error || 'The space you are looking for does not exist.'}</p>
          <Link
            to="/spaces"
            className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Spaces
          </Link>
        </div>
      </div>
    );
  }

  const units = space.units || [];
  const hasPhone = !!user?.phone;


  const spaceLocation = [space.city, space.state].filter(Boolean).join(', ');
  const spaceDescription = [
    space.description,
    spaceLocation && `Available in ${spaceLocation}.`,
  ].filter(Boolean).join(' ');

  return (
    <>
      <SEO
        title={`${space.title}${spaceLocation ? ` in ${spaceLocation}` : ''} - LookAtLocal`}
        description={spaceDescription || `Explore ${space.title} and other local properties on LookAtLocal.`}
        canonical={`/spaces/${spaceId}`}
        image={space.images?.[0]}
        type="article"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <button
          onClick={() => navigate('/spaces')}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Spaces
        </button>

        <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white shadow-sm rounded-2xl dark:bg-slate-800">
              <div className="relative">
                <ImageCarousel
                  images={space.images}
                  alt={space.title}
                  heightClass="h-64"
                  objectFit="contain"
                />
                <div className="absolute flex flex-wrap gap-2 top-4 left-4">
                  {space.status === 'ACTIVE' && (
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Available
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                    {getSpaceTypeIcon(space.spaceType)}
                    {getSpaceTypeLabel(space.spaceType)}
                  </span>
                </div>

              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {space.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {space.category?.name || 'Space'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {space.city}, {space.state}
                  </div>
                  {space.locality && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">• {space.locality}</span>
                  )}
                  {units?.length > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Package className="w-4 h-4" />
                      {units.filter(u => u.status === 'AVAILABLE')?.length} units available
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Description</h3>
                  <div className="mt-2">
                    <p className={`text-sm text-gray-600 dark:text-gray-300 ${!showFullDescription ? 'line-clamp-4' : ''}`}>
                      {space.description}
                    </p>
                    {space.description && space.description?.length > 200 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {showFullDescription ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>
                </div>

                {space.addressLine && (
                  <div className="p-4 mt-4 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Address:</span> {space.addressLine}
                    </p>
                  </div>
                )}

                {space.status === 'ACTIVE' && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={handleCall}
                      disabled={!hasPhone}
                      className={`flex items-center gap-2 px-6 py-3 text-white transition rounded-xl hover:shadow-lg hover:shadow-blue-500/25 ${hasPhone ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      <Phone className="w-5 h-5" />
                      {hasPhone ? 'Call Now' : 'No Phone Number'}
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      disabled={!hasPhone}
                      className={`flex items-center gap-2 px-6 py-3 text-white transition rounded-xl ${hasPhone ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      {hasPhone ? 'WhatsApp' : 'No Phone Number'}
                    </button>
                    {/* <button className="flex items-center gap-2 px-6 py-3 text-gray-700 transition bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600">
                      < className="w-5 h-5" />
                      Send Message
                    </button> */}
                    {/* <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 transition bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                    >
                      < className={`w-5 h-5 ${isWishlisted || space.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-200'}`} />
                      {isWishlisted || space.isFavorite ? 'Saved' : 'Save'}
                    </button> */}
                  </div>
                )}
              </div>
            </div>

            {units?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Units</h2>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                  {units?.map((unit) => (
                    <SpaceUnitCard key={unit.id} unit={unit} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <ProviderCard
              user={space.owner || {}}
              roleLabel="Space Owner"
              providingSince={space?.createdAt}
              isPhoneVerified={space.owner?.isPhoneVerified}
              isEmailVerified={space.owner?.isEmailVerified}
              isTopRated={space?.averageRating > 4.5}
              profilePath={`/users/${space.owner?.id}`}
            />

            <RelatedSpaces spaces={space.similarSpaces}/>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default SpaceDetails;