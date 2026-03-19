import { createContext, useReducer } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {}
});

function shoppingCartReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_ITEM": {
      const newState = { ...state };
      const updatedItems = [...state.items];
      const { id } = payload;

      const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === id);
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1
        });
      }

      newState.items = updatedItems;

      return newState;
    }
    case "UPDATE_ITEM": {
      const newState = { ...state };
      const { id, amount } = payload;

      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex((item) => item.id === id);

      const updatedItem = {
        ...updatedItems[updatedItemIndex]
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      newState.items = updatedItems;

      return newState;
    }
    default: {
      return state;
    }
  }
}

export function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    items: []
  });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: { id }
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        id: productId,
        amount
      }
    });
  }

  const contextValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity
  };

  return <CartContext value={contextValue}>{children}</CartContext>;
}
