import "../config/db.js";
import { ProductsModel } from "./models/product.js";

export default class ProductDao {
  ID_FIELD = "_id";

  static async exists(id) {
    try {
      return await ProductsModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
  async getAll(
    page = 1,
    limit = 10,
    title,
    sort,
    description,
    category,
    stock
  ) {
    try {
      let baseUrl = "http://localhost:8080/products";
      const queryParams = [];
      const filter = {};

      if (category) {
        filter.category = category;
        queryParams.push(`category=${encodeURIComponent(category)}`);
      }
      if (stock) {
        filter.stock = stock;
        queryParams.push(`stock=${stock}`);
      }

      if (limit) queryParams.push(`limit=${limit}`);

      if (title) {
        queryParams.push(`title=${encodeURIComponent(title)}`);
        filter.title = title;
      }

      if (description) {
        filter.description = description;
        queryParams.push(`description=${encodeURIComponent(description)}`);
      }

      let sortOrder = {};

      if (sort) {
        queryParams.push(`sort=${sort}`);
        sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      }
      const response = await ProductsModel.paginate(filter, {
        page,
        limit,
        sort: sortOrder,
        lean: true,
      });

      if (queryParams.length > 0) {
        baseUrl += "?" + queryParams.join("&");
      }

      const nextLink = response.hasNextPage
        ? `${baseUrl}&page=${response.nextPage}`
        : null;

      const prevLink = response.hasPrevPage
        ? `${baseUrl}&page=${response.prevPage}`
        : null;

      return { ...response, nextLink, prevLink, page };
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      console.log("id==", id);
      console.log("type==", typeof id);
      const response = await ProductsModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const response = await ProductsModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await ProductsModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await ProductsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
