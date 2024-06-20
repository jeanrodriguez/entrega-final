import { Schema, model } from "mongoose";

export const cartsCollectionName = "carts";

export const cartSchema = new Schema(
  {
    products: [
      {
        _id: false,
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "products", // Referencia al modelo de productos
        },
      },
    ],
  },
  { versionKey: false }
);

export const CartModel = model(cartsCollectionName, cartSchema);
