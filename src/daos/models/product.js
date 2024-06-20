import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const productCollectionName = "products";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 100,
    },
    status: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      max: 500,
    },
    code: {
      type: String,
      required: true,
      max: 10,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: [String],
      max: 200,
    },
    stock: {
      type: Number,
      required: true,
      max: 5000,
    },
  },
  { versionKey: false }
);

productSchema.plugin(mongoosePaginate);

export const ProductsModel = mongoose.model(
  productCollectionName,
  productSchema
);
