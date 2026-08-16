import React, { useState } from 'react';
import { Plus, Trash2, IndianRupee } from 'lucide-react';

const StepUnits = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});
  const [showUnitForm, setShowUnitForm] = useState(false);
  const [unitData, setUnitData] = useState({
    unitNumber: '',
    floor: '',
    areaSqft: '',
    pricingType: 'MONTHLY',
    price: '',
    depositAmount: 0,
    availableFrom: '',
    status: 'AVAILABLE',
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleUnitChange = (e) => {
    const { name, value } = e.target;
    setUnitData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addUnit = () => {
    if (!unitData.price) {
      setErrors({ ...errors, unitPrice: 'Price is required' });
      return;
    }
    if (parseFloat(unitData.price) <= 0) {
      setErrors({ ...errors, unitPrice: 'Price must be greater than 0' });
      return;
    }

    const units = [...(formData.units || [])];
    const unitToAdd = {
      ...unitData,
      price: parseFloat(unitData.price),
      depositAmount: parseFloat(unitData.depositAmount) || 0,
      areaSqft: unitData.areaSqft ? parseFloat(unitData.areaSqft) : undefined,
    };

    if (editIndex !== null) {
      units[editIndex] = unitToAdd;
      setEditIndex(null);
    } else {
      units.push(unitToAdd);
    }

    updateFormData({ units });
    setUnitData({
      unitNumber: '',
      floor: '',
      areaSqft: '',
      pricingType: 'MONTHLY',
      price: '',
      depositAmount: 0,
      availableFrom: '',
      status: 'AVAILABLE',
    });
    setShowUnitForm(false);
    setErrors({});
  };

  const editUnit = (index) => {
    const unit = formData.units[index];
    setUnitData({
      unitNumber: unit.unitNumber || '',
      floor: unit.floor || '',
      areaSqft: unit.areaSqft || '',
      pricingType: unit.pricingType || 'MONTHLY',
      price: unit.price || '',
      depositAmount: unit.depositAmount || 0,
      availableFrom: unit.availableFrom || '',
      status: unit.status || 'AVAILABLE',
    });
    setEditIndex(index);
    setShowUnitForm(true);
  };

  const removeUnit = (index) => {
    const units = [...(formData.units || [])];
    units.splice(index, 1);
    updateFormData({ units });
  };

  const getPricingTypeLabel = (type) => {
    const labels = {
      DAILY: 'Daily',
      WEEKLY: 'Weekly',
      MONTHLY: 'Monthly',
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status) => {
    const labels = {
      AVAILABLE: 'Available',
      RESERVED: 'Reserved',
      OCCUPIED: 'Occupied',
    };
    return labels[status] || status;
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-950 dark:text-white">Units</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add units to your space listing</p>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => {
            setEditIndex(null);
            setUnitData({
              unitNumber: '',
              floor: '',
              areaSqft: '',
              pricingType: 'MONTHLY',
              price: '',
              depositAmount: 0,
              availableFrom: '',
              status: 'AVAILABLE',
            });
            setShowUnitForm(true);
            setErrors({});
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Unit
        </button>
      </div>

      {showUnitForm && (
        <div className="p-4 mt-4 border border-gray-200 rounded-xl dark:border-slate-700">
          <h3 className="mb-4 text-sm font-semibold text-gray-950 dark:text-white">
            {editIndex !== null ? 'Edit Unit' : 'New Unit'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="unitNumber" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">Unit Number</label>
              <input
                id="unitNumber"
                name="unitNumber"
                type="text"
                value={unitData.unitNumber}
                onChange={handleUnitChange}
                placeholder="e.g. A-101"
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="floor" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">Floor</label>
              <input
                id="floor"
                name="floor"
                type="text"
                value={unitData.floor}
                onChange={handleUnitChange}
                placeholder="e.g. 2nd Floor"
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="areaSqft" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">Area (sqft)</label>
              <input
                id="areaSqft"
                name="areaSqft"
                type="number"
                min="0"
                step="0.01"
                value={unitData.areaSqft}
                onChange={handleUnitChange}
                placeholder="e.g. 500"
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="pricingType" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">Pricing Type</label>
              <select
                id="pricingType"
                name="pricingType"
                value={unitData.pricingType}
                onChange={handleUnitChange}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={unitData.price}
                onChange={handleUnitChange}
                placeholder="e.g. 10000"
                className={`h-[42px] w-full rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${
                  errors.unitPrice ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.unitPrice && <p className="mt-1 text-sm text-red-500">{errors.unitPrice}</p>}
            </div>

            <div>
              <label htmlFor="depositAmount" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">Deposit Amount</label>
              <input
                id="depositAmount"
                name="depositAmount"
                type="number"
                min="0"
                step="0.01"
                value={unitData.depositAmount}
                onChange={handleUnitChange}
                placeholder="e.g. 5000"
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="availableFrom" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">Available From</label>
              <input
                id="availableFrom"
                name="availableFrom"
                type="date"
                value={unitData.availableFrom}
                onChange={handleUnitChange}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-950 dark:text-gray-200">Status</label>
              <select
                id="status"
                name="status"
                value={unitData.status}
                onChange={handleUnitChange}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="AVAILABLE">Available</option>
                <option value="RESERVED">Reserved</option>
                <option value="OCCUPIED">Occupied</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={addUnit}
              className="flex h-10 min-w-[100px] items-center justify-center gap-2 rounded-xl bg-gray-950 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {editIndex !== null ? 'Update' : 'Add'}
            </button>
            <button
              onClick={() => {
                setShowUnitForm(false);
                setEditIndex(null);
                setErrors({});
              }}
              className="flex h-10 min-w-[100px] items-center justify-center rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {formData.units && formData.units?.length > 0 && (
        <div className="mt-6 space-y-3">
          {formData.units?.map((unit, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl dark:border-slate-700"
            >
              <div>
                <div className="flex items-center gap-3">
                  {unit.unitNumber && (
                    <span className="font-medium text-gray-950 dark:text-white">Unit {unit.unitNumber}</span>
                  )}
                  {unit.floor && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">Floor {unit.floor}</span>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {getStatusLabel(unit.status)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm">
                  {unit.areaSqft && (
                    <span className="text-gray-500 dark:text-gray-400">{unit.areaSqft} sqft</span>
                  )}
                  <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
                    <IndianRupee className="w-4 h-4" />
                    {unit.price}
                    <span className="font-normal text-gray-500 dark:text-gray-400">
                      /{getPricingTypeLabel(unit.pricingType).toLowerCase()}
                    </span>
                  </span>
                  {unit.depositAmount > 0 && (
                    <span className="text-gray-500 dark:text-gray-400">Deposit: ₹{unit.depositAmount}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editUnit(index)}
                  className="p-1.5 text-gray-500 transition rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => removeUnit(index)}
                  className="p-1.5 text-red-500 transition rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(!formData.units || formData.units?.length === 0) && !showUnitForm && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No units added yet. Click "Add Unit" to get started.
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition rounded-xl bg-gray-950 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Next Step
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StepUnits;