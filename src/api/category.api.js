import instance from "./axiosInstance";

// GET /categories  — public, returns only isActive: true
export const getAllCategoriesApi = async () => {
  try {
    console.log("➡️ Fetching categories...");

    const res = await instance.get("/categories");

    console.log("✅ Categories fetched:", res.data?.data?.categories?.length);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch categories failed:", error.response?.data || error.message);
    throw error;
  }
};

// POST /categories  — admin only, body: { name, description?, iconUrl? }
export const createCategoryApi = async (payload) => {
  try {
    console.log("➡️ Creating category...");
    console.log("Payload:", payload);

    const res = await instance.post("/categories", payload);

    console.log("✅ Category created:", res.data?.data?.category?.name);
    return res.data;
  } catch (error) {
    console.error("❌ Create category failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /categories/:id  — admin only, body: { name?, description?, iconUrl?, isActive? }
export const updateCategoryApi = async (id, payload) => {
  try {
    console.log("➡️ Updating category:", id);
    console.log("Payload:", payload);

    const res = await instance.patch(`/categories/${id}`, payload);

    console.log("✅ Category updated:", res.data?.data?.category?.name);
    return res.data;
  } catch (error) {
    console.error("❌ Update category failed:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE /categories/:id  — admin only, soft-delete (sets isActive: false)
export const deleteCategoryApi = async (id) => {
  try {
    console.log("➡️ Deleting category (soft):", id);

    const res = await instance.delete(`/categories/${id}`);

    console.log("✅ Category soft-deleted");
    return res.data;
  } catch (error) {
    console.error("❌ Delete category failed:", error.response?.data || error.message);
    throw error;
  }
};
