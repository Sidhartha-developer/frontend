import { useEffect, useState } from "react";
import AdminLayout             from "../../components/layout/AdminLayout";
import Loader                  from "../../components/ui/Loader";
import Button                  from "../../components/ui/Button";
import Alert                   from "../../components/ui/Alert";
import Modal                   from "../../components/ui/Modal";
import ConfirmDialog           from "../../components/ui/ConfirmDialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  getAllCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../../api/category.api";

const blank = { name: "", description: "", iconUrl: "" };

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [alert, setAlert]           = useState({ type: "", message: "" });
  const [modal, setModal]           = useState({ open: false, mode: "add", data: null });
  const [confirm, setConfirm]       = useState({ open: false, id: null });
  const [form, setForm]             = useState(blank);
  const [busy, setBusy]             = useState(false);

  const load = () => {
    setLoading(true);
    getAllCategoriesApi()
      .then((res) => setCategories(res.data.categories))
      .catch(() => setAlert({ type: "error", message: "Failed to load" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(blank); setModal({ open: true, mode: "add", data: null }); };
  const openEdit = (c) => { setForm({ name: c.name, description: c.description || "", iconUrl: c.iconUrl || "" }); setModal({ open: true, mode: "edit", data: c }); };
  const closeModal = () => setModal({ open: false, mode: "add", data: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setAlert({ type: "error", message: "Name is required" }); return; }

    setBusy(true);
    try {
      if (modal.mode === "add") {
        await createCategoryApi(form);
        setAlert({ type: "success", message: "Category created" });
      } else {
        await updateCategoryApi(modal.data._id, form);
        setAlert({ type: "success", message: "Category updated" });
      }
      closeModal();
      load();
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.message || "Failed" });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await deleteCategoryApi(confirm.id);
      setAlert({ type: "success", message: "Category deleted" });
      setConfirm({ open: false, id: null });
      load();
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.message || "Delete failed" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Categories</h1>
        <Button onClick={openAdd} className="inline-flex items-center gap-2">
          <Plus size={16} />
          Add Category
        </Button>
      </div>

      {alert.message && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} className="mb-4" />
      )}

      {loading ? <Loader /> : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {categories.length === 0 ? (
            <p className="text-center py-12 text-gray-400">No categories yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-gray-50 text-gray-500 text-left">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Description</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {categories.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-800">{c.name}</td>
                      <td className="px-5 py-3 text-gray-500">{c.description || "—"}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(c)}
                            className="inline-flex items-center gap-1 rounded-md border border-blue-200 px-2 py-1 text-xs text-blue-700 hover:bg-blue-50"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirm({ open: true, id: c._id })}
                            className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={modal.open} onClose={closeModal} title={modal.mode === "add" ? "Add Category" : "Edit Category"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon URL</label>
            <input
              value={form.iconUrl}
              onChange={(e) => setForm((p) => ({ ...p, iconUrl: e.target.value }))}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={closeModal} type="button">Cancel</Button>
            <Button type="submit" loading={busy}>{modal.mode === "add" ? "Create" : "Update"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={confirm.open}
        onClose={() => setConfirm({ open: false, id: null })}
        onConfirm={handleDelete}
        loading={busy}
        title="Delete Category"
        message="This soft-deletes the category. It won't appear publicly anymore."
      />
    </AdminLayout>
  );
};

export default CategoriesManagement;
