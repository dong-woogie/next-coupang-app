import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getTotalValue = (cartItems) => {
  const initial = {
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  };

  if (cartItems.length === 0) return initial;

  const total = cartItems.reduce((prev, curr) => {
    prev.cartTotalQuantity += curr.cartQuantity;
    prev.cartTotalAmount += curr.price * curr.cartQuantity;

    return prev;
  }, initial);

  return total;
};

const setCartItems = (cartItems) => {
  window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const initialCartItems = (() => {
  if (typeof window === "undefined") return [];

  const cartItems = window.localStorage.getItem("cartItems");

  if (!cartItems) return [];

  return JSON.parse(cartItems);
})();

const initialTotal = getTotalValue(initialCartItems);

const initialState = {
  cartItems: initialCartItems,
  cartTotalQuantity: initialTotal.cartTotalQuantity,
  cartTotalAmount: initialTotal.cartTotalAmount,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const findIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const increaseCount = action.payload.cartQuantity || 1;

      if (findIndex === -1) {
        state.cartItems.push({
          ...action.payload,
          cartQuantity: increaseCount,
        });

        toast.success(`${action.payload.name} 상품이 추가되었습니다.`);
      }

      if (findIndex >= 0) {
        state.cartItems[findIndex].cartQuantity += increaseCount;
        toast.success(`${action.payload.name} 상품이 하나 추가되었습니다.`);
      }

      const total = getTotalValue(state.cartItems);

      state.cartTotalQuantity = total.cartTotalQuantity;
      state.cartTotalAmount = total.cartTotalAmount;

      setCartItems(state.cartItems);
    },
    REMOVE_FROM_CART: (state, action) => {
      const { id } = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      const total = getTotalValue(state.cartItems);

      state.cartTotalQuantity = total.cartTotalQuantity;
      state.cartTotalAmount = total.cartTotalAmount;
      setCartItems(state.cartItems);
    },
    INCREASE_CART: (state, action) => {
      const { id } = action.payload;

      const findIndex = state.cartItems.findIndex((item) => item.id === id);

      state.cartItems[findIndex].cartQuantity += 1;

      const total = getTotalValue(state.cartItems);

      state.cartTotalQuantity = total.cartTotalQuantity;
      state.cartTotalAmount = total.cartTotalAmount;
      setCartItems(state.cartItems);
    },
    DECREASE_CART: (state, action) => {
      const { id } = action.payload;

      const find = state.cartItems.find((item) => item.id === id);

      if (find.cartQuantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === id)
            return {
              ...item,
              cartQuantity: item.cartQuantity - 1,
            };

          return item;
        });
      }

      const total = getTotalValue(state.cartItems);

      state.cartTotalAmount = total.cartTotalAmount;
      state.cartTotalQuantity = total.cartTotalQuantity;
      setCartItems(state.cartItems);
    },
    CLEAR_CART: (state) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      window.localStorage.removeItem("cartItems");
    },
    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },
  },
});

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export const {
  ADD_TO_CART,
  DECREASE_CART,
  INCREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SAVE_URL,
} = cartSlice.actions;

export default cartSlice.reducer;
