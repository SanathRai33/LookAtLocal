import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Phone,
  CheckCircle,
  IndianRupee,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Package,
  Truck,
  Home,
} from 'lucide-react';
import useProductBooking from '../../hooks/useProductBooking';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../context/AuthContext';
import { FaWhatsapp } from 'react-icons/fa';
import ImageCarousel from '../../components/common/ImageCarousel';
import ProviderCard from '../../components/common/ProviderCard';
import RelatedProducts from './components/RelatedProducts';
import ProductBookingModal from './components/ProductBookingModal'

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProductById, loading } = useProducts();
  const { createBooking, loading: bookingLoading } = useProductBooking();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    const result = await getProductById(productId);
    if (result.success) {
      setProduct(result.data);
    } else {
      setError(result.error);
    }
  };


  const getInitials = (name) => {
    return name?.split(' ')?.map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const getConditionLabel = (cond) => {
    const labels = {
      NEW: 'New',
      LIKE_NEW: 'Like New',
      GOOD: 'Good',
      FAIR: 'Fair',
      POOR: 'Poor',
    };
    return labels[cond] || cond;
  };

  const getConditionColor = (cond) => {
    const colors = {
      NEW: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      LIKE_NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      GOOD: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      FAIR: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      POOR: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[cond] || colors.GOOD;
  };

  const getDeliveryLabel = (option) => {
    const labels = {
      PICKUP: 'Pickup Only',
      SELLER_DELIVERY: 'Seller Delivery',
      BOTH: 'Both',
    };
    return labels[option] || option;
  };

  const getDeliveryIcon = (option) => {
    const icons = {
      PICKUP: <Home className="w-4 h-4" />,
      SELLER_DELIVERY: <Truck className="w-4 h-4" />,
      BOTH: <Package className="w-4 h-4" />,
    };
    return icons[option] || <Package className="w-4 h-4" />;
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
      `Hi, I'm interested in buying: ${product?.title || ''}`
    );
    window.open(
      `https://wa.me/${cleanNumber}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleRequestToBuy = () => {
    if (!user) {
      navigate("/login", {
        state: {
          from: `/products/${productId}`,
        },
      });

      return;
    }

    if (product?.seller?.id === user?.id) {
      return;
    }

    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    setBookingError('');
    setBookingSuccess('');

    const result = await createBooking({
      productId: product.id,
    });

    if (!result.success) {
      setBookingError(result.error);
      return;
    }

    setShowBookingModal(false);
    setBookingSuccess(
      'Purchase request sent successfully.'
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const hasPhone = !!user?.phone;


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Marketplace
        </button>

        <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white shadow-sm rounded-2xl dark:bg-slate-800">
              <div className="relative">
                <ImageCarousel
                  images={product.images}
                  alt={product.title}
                  heightClass="h-64"
                  objectFit="contain"
                />
                <div className="absolute flex flex-wrap gap-2 top-4 left-4">
                  {product.status === 'ACTIVE' && (
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Available
                    </span>
                  )}
                  {product.isNegotiable && (
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-yellow-500 rounded-full">
                      Negotiable
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getConditionColor(product.condition)}`}>
                    {getConditionLabel(product.condition)}
                  </span>
                </div>

              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {product.category?.name || 'Product'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      <IndianRupee className="inline w-5 h-5" />
                      {product.price}
                    </div>
                    {product.isNegotiable && (
                      <span className="text-xs text-yellow-600 dark:text-yellow-400">Negotiable</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {product.city}, {product.state}
                  </div>
                  {product.locality && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">• {product.locality}</span>
                  )}
                  {product.averageRating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {product.averageRating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    {getDeliveryIcon(product.deliveryOption)}
                    {getDeliveryLabel(product.deliveryOption)}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Description</h3>
                  <div className="mt-2">
                    <p className={`text-sm text-gray-600 dark:text-gray-300 ${!showFullDescription ? 'line-clamp-4' : ''}`}>
                      {product.description}
                    </p>
                    {product.description && product.description?.length > 200 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {showFullDescription ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>
                </div>

                {product.addressLine && (
                  <div className="p-4 mt-4 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Address:</span> {product.addressLine}
                    </p>
                  </div>
                )}

                {product.status === 'ACTIVE' && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {
                      product.seller?.id !== user?.id && (
                        <button
                          type="button"
                          onClick={handleRequestToBuy}
                          disabled={product?.seller?.id === user?.id}
                          className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition rounded-xl ${product?.seller?.id === user?.id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
                            }`}
                        >
                          <Package className="w-5 h-5" />
                          {product?.seller?.id === user?.id
                            ? "Your Product"
                            : "Request to Buy"}
                        </button>)
                    }

                    <button
                      onClick={handleCall}
                      disabled={!hasPhone}
                      className={`flex items-center gap-2 px-6 py-3 text-white transition rounded-xl hover:shadow-lg hover:shadow-blue-500/25 ${hasPhone
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                      <Phone className="w-5 h-5" />

                      {hasPhone
                        ? 'Call Now'
                        : 'No Phone Number'}
                    </button>

                    <button
                      onClick={handleWhatsApp}
                      disabled={!hasPhone}
                      className={`flex items-center gap-2 px-6 py-3 text-white transition rounded-xl ${hasPhone
                        ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                      <FaWhatsapp className="w-5 h-5" />

                      {hasPhone
                        ? 'WhatsApp'
                        : 'No Phone Number'}
                    </button>
                  </div>
                )}

                {product.reviewCount > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Reviews ({product.reviewCount})</h3>
                    <div className="mt-3 space-y-3">
                      {[1, 2]?.map((_, index) => (
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
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Great product! Highly recommended.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProviderCard
              user={product.seller || {}}
              roleLabel="Product Seller"
              providingSince={product?.createdAt}
              isPhoneVerified={product.seller?.isPhoneVerified}
              isEmailVerified={product.seller?.isEmailVerified}
              isTopRated={product?.averageRating > 4.5}
              profilePath={`/users/${product.seller?.id}`}
            />

            <RelatedProducts products={product.similarProducts} />
          </div>
        </div>
      </div>
      <ProductBookingModal
        product={product}
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        createBooking={createBooking}
        loading={bookingLoading}
      />
    </div>
  );
};

export default ProductDetails;