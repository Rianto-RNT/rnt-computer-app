export const codReducer = (state = false, action) => {
    switch (action.type) {
      case "COD":
        return action.payload;
      default:
        return state;
    }
  };
  