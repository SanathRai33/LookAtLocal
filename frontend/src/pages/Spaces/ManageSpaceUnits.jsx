import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Loader2,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  CheckCircle,
  Clock,
  IndianRupee,
  Calendar
} from 'lucide-react';
import { useSpaces } from '../../hooks/useSpaces';
import { useSpaceUnits } from '../../hooks/useSpaceUnits';

const ManageSpaceUnits = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { getSpaceById, loading: spaceLoading } = useSpaces();
  const { units, loading, getSpaceUnits, createSpaceUnit, updateSpaceUnit, deleteSpaceUnit } = useSpaceUnits();
  const [space, setSpace] = useState(null);
  const [error, setError] = useState('');
  const [showUnitForm, setShowUnitForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [formData, setFormData] = useState({
    unitNumber: '',
    floor: '',
    areaSqft: '',
    pricingType: 'MONTHLY',
    price: '',
    depositAmount: 0,
    availableFrom: '',
    status: 'AVAILABLE',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSpace();
    fetchUnits();
  }, [spaceId]);

  const fetchSpace = async () => {
    const result = await getSpaceById(spaceId);
    if (result.success) {
      setSpace(result.data);
    } else {
      setError('Failed to load space');
    }
  };

  const fetchUnits = async () => {
    await getSpaceUnits(spaceId);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      unitNumber: '',
      floor: '',
      areaSqft: '',
      pricingType: 'MONTHLY',
      price: '',
      depositAmount: 0,
      availableFrom: '',
      status: 'AVAILABLE',
    });
    setEditingUnit(null);
    setShowUnitForm(false);
  };

  const handleEdit = (unit) => {
    setEditingUnit(unit);
    setFormData({
      unitNumber: unit.unitNumber || '',
      floor: unit.floor || '',
      areaSqft: unit.areaSqft || '',
      pricingType: unit.pricingType || 'MONTHLY',
      price: unit.price || '',
      depositAmount: unit.depositAmount || 0,
      availableFrom: unit.availableFrom ? unit.availableFrom.split('T')[0] : '',
      status: unit.status || 'AVAILABLE',
    });
    setShowUnitForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        depositAmount: parseFloat(formData.depositAmount) || 0,
        areaSqft: formData.areaSqft ? parseFloat(formData.areaSqft) : undefined,
      };

      let result;
      if (editingUnit) {
        result = await updateSpaceUnit(spaceId, editingUnit.id, data);
      } else {
        result = await createSpaceUnit(spaceId, data);
      }

      if (result.success) {
        resetForm();
        await fetchUnits();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to save unit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (unitId) => {
    if (!window.confirm('Are you sure you want to delete this unit?')) return;

    const result = await deleteSpaceUnit(spaceId, unitId);
    if (result.success) {
      await fetchUnits();
    } else {
      setError(result.error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getStatusColor = (status) => {
    const colors = {
      AVAILABLE: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
      RESERVED: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
      OCCUPIED: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
    };
    return colors[status] || colors.AVAILABLE;
  };

  const getPricingTypeLabel = (type) => {
    const labels = {
      DAILY: 'Daily',
      WEEKLY: 'Weekly',
      MONTHLY: 'Monthly'
    };
    return labels[type] || type;
  };

  if (spaceLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="w-full max-w-5xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/spaces/my-spaces')}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to My Spaces
          </button>
          {space && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {space.title}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              Manage Units
            </h1>
            <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
              Add and manage units for your space
            </p>
          </div>
          <button
            onClick={() => setShowUnitForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition rounded-xl bg-gray-950 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Unit
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {showUnitForm && (
          <div className="p-6 mb-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
                {editingUnit ? 'Edit Unit' : 'Add New Unit'}
              </h2>
              <button
                onClick={resetForm}
                className="p-1 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="unitNumber" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">
                    Unit Number
                  </label>
                  <input
                    id="unitNumber"
                    name="unitNumber"
                    type="text"
                    value={formData.unitNumber}
                    onChange={handleChange}
                    placeholder="e.g. A-101"
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="floor" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">
                    Floor
                  </label>
                  <input
                    id="floor"
                    name="floor"
                    type="text"
                    value={formData.floor}
                    onChange={handleChange}
                    placeholder="e.g. 2nd Floor"
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="areaSqft" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">
                    Area (sqft)
                  </label>
                  <input
                    id="areaSqft"
                    name="areaSqft"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.areaSqft}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="pricingType" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">
                    Pricing Type
                  </label>
                  <select
                    id="pricingType"
                    name="pricingType"
                    value={formData.pricingType}
                    onChange={handleChange}
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 10000"
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="depositAmount" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">
                    Deposit Amount
                  </label>
                  <input
                    id="depositAmount"
                    name="depositAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.depositAmount}
                    onChange={handleChange}
                    placeholder="e.g. 5000"
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="availableFrom" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">
                    Available From
                  </label>
                  <input
                    id="availableFrom"
                    name="availableFrom"
                    type="date"
                    value={formData.availableFrom}
                    onChange={handleChange}
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="RESERVED">Reserved</option>
                    <option value="OCCUPIED">Occupied</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-12 min-w-[120px] items-center justify-center gap-2 rounded-xl bg-gray-950 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editingUnit ? 'Update' : 'Add'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex h-12 min-w-[120px] items-center justify-center rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {units?.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">📦</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-950 dark:text-white">No units yet</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Click "Add Unit" to create your first unit
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {units?.map((unit) => (
              <div
                key={unit.id}
                className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    {unit.unitNumber && (
                      <h4 className="font-semibold text-gray-950 dark:text-white">
                        Unit {unit.unitNumber}
                      </h4>
                    )}
                    {unit.floor && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Floor {unit.floor}
                      </p>
                    )}
                  </div>
                  <span className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(unit.status)}`}>
                    {unit.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                  {unit.areaSqft && (
                    <span className="text-gray-600 dark:text-gray-300">{unit.areaSqft} sqft</span>
                  )}
                  <span className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400">
                    <IndianRupee className="w-4 h-4" />
                    {unit.price}
                    <span className="font-normal text-gray-500 dark:text-gray-400">
                      /{getPricingTypeLabel(unit.pricingType).toLowerCase()}
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {unit.depositAmount > 0 && (
                    <span>Deposit: ₹{unit.depositAmount}</span>
                  )}
                  {unit.availableFrom && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      From {formatDate(unit.availableFrom)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-3 mt-3 border-t border-gray-100 dark:border-slate-700">
                  <button
                    onClick={() => handleEdit(unit)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(unit.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 transition border border-red-300 rounded-lg hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSpaceUnits;