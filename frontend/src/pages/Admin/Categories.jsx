import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Loader2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Save,
  X,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

const Categories = () => {
  const { getCategories, createCategory, updateCategory, toggleCategoryStatus, deleteCategory, loading } = useAdmin();
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    module: 'SERVICE',
    sortOrder: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const modules = [
    { value: 'SERVICE', label: 'Service' },
    { value: 'RENTAL', label: 'Rental' },
    { value: 'PRODUCT', label: 'Product' },
    { value: 'SPACE', label: 'Space' },
    { value: 'JOB', label: 'Job' },
  ];

  useEffect(() => {
    fetchCategories();
  }, [pagination.page, filterModule]);

  const fetchCategories = async () => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      ...(search && { search }),
      ...(filterModule && { module: filterModule }),
    };
    const result = await getCategories(params);
    if (result.success) {
      setCategories(result.data || []);
      setPagination(result.meta || { page: 1, limit: 10, total: 0, totalPages: 0 });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchCategories();
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        icon: category.icon || '',
        module: category.module || 'SERVICE',
        sortOrder: category.sortOrder || 0,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        icon: '',
        module: 'SERVICE',
        sortOrder: 0,
      });
    }
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const result = editingCategory
      ? await updateCategory(editingCategory.id, formData)
      : await createCategory(formData);

    if (result.success) {
      setShowModal(false);
      fetchCategories();
    } else {
      setError(result.error);
    }
    setSubmitting(false);
  };

  const handleToggleStatus = async (categoryId) => {
    const result = await toggleCategoryStatus(categoryId);
    if (result.success) {
      fetchCategories();
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    setDeleteLoading(true);
    const result = await deleteCategory(selectedCategory.id);
    if (result.success) {
      setShowDeleteModal(false);
      setSelectedCategory(null);
      fetchCategories();
    }
    setDeleteLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getModuleLabel = (module) => {
    const found = modules.find(m => m.value === module);
    return found ? found.label : module;
  };

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage platform categories</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition rounded-xl bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full h-10 pl-9 pr-3 text-sm border border-gray-200 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </form>

        <div className="flex gap-2">
          <select
            value={filterModule}
            onChange={(e) => {
              setFilterModule(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="h-10 px-3 text-sm border border-gray-200 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Modules</option>
            {modules.map((module) => (
              <option key={module.value} value={module.value}>{module.label}</option>
            ))}
          </select>
          <button
            onClick={fetchCategories}
            className="flex items-center gap-2 px-4 h-10 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm dark:bg-slate-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Name</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Slug</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Module</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Order</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Created</th>
              <th className="px-4 py-3 text-xs font-medium text-right text-gray-500 uppercase dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {category.icon && (
                      <span className="text-lg">{category.icon}</span>
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{category.slug}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {getModuleLabel(category.module)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{category.sortOrder}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleStatus(category.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition ${
                      category.isActive
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {category.isActive ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    {category.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{formatDate(category.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="p-1.5 text-blue-600 rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowDeleteModal(true);
                      }}
                      className="p-1.5 text-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {categories.length} of {pagination.total} categories
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Category name"
                  required
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="category-slug"
                  required
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Icon (emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="📌"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Module</label>
                <select
                  value={formData.module}
                  onChange={(e) => setFormData(prev => ({ ...prev, module: e.target.value }))}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  {modules.map((module) => (
                    <option key={module.value} value={module.value}>{module.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Sort Order</label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                  min="0"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-12 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 h-12 text-sm font-medium text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : (editingCategory ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl dark:bg-slate-900">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full dark:bg-red-950/30">
              <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-center text-gray-950 dark:text-white">Delete Category</h3>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Are you sure you want to delete "{selectedCategory.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCategory(null);
                }}
                className="flex-1 h-12 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 h-12 text-sm font-medium text-white transition bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50"
              >
                {deleteLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;