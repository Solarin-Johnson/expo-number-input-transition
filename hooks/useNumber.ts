import { useReducer } from "react";

interface NumberState {
  displayValue: string;
  value: number;
  isDecimal: boolean;
  decimalPlaces: number;
}

interface Action {
  type: string;
  digit?: number;
}

const MAX_DIGITS = 13;
const MAX_DECIMAL_PLACES = 2;

function numberReducer(state: NumberState, action: Action): NumberState {
  switch (action.type) {
    case "APPEND_DIGIT":
      return handleAppendDigit(state, action.digit!);

    case "DECIMAL_POINT":
      return handleDecimalPoint(state);

    case "REPLACE_DIGIT":
      return handleReplaceDigit(state, action.digit!);

    case "DELETE_DIGIT":
      return handleDeleteDigit(state);

    case "CLEAR_ALL":
      return handleClearAll();

    default:
      return state;
  }
}

function handleReplaceDigit(state: NumberState, digit: number): NumberState {
  if (digit === 0) {
    return {
      value: 0,
      isDecimal: false,
      decimalPlaces: 0,
      displayValue: "0",
    };
  }

  const newDisplayValue = digit.toString();

  const formattedValue = formatDisplayValue(newDisplayValue);

  const rawValue = parseFloat(newDisplayValue.replace(/,/g, ""));

  return {
    ...state,
    displayValue: formattedValue,
    value: rawValue,
    isDecimal: false,
    decimalPlaces: 0,
  };
}

function handleAppendDigit(state: NumberState, digit: number): NumberState {
  if (state.displayValue.replace(/[.,]/g, "").length >= MAX_DIGITS) {
    return state;
  }

  if (state.isDecimal && state.decimalPlaces >= MAX_DECIMAL_PLACES) {
    return state;
  }

  let newDisplayValue = state.displayValue;

  if (state.displayValue === "0" && digit !== 0) {
    newDisplayValue = digit.toString();
  } else {
    newDisplayValue = state.displayValue + digit.toString();
  }

  const rawValue = parseFloat(newDisplayValue.replace(/,/g, ""));
  const formattedValue = formatDisplayValue(newDisplayValue);

  return {
    ...state,
    displayValue: formattedValue,
    value: rawValue,
    decimalPlaces: state.isDecimal ? state.decimalPlaces + 1 : 0,
  };
}

function handleDecimalPoint(state: NumberState): NumberState {
  if (state.isDecimal) {
    return state;
  }

  return {
    ...state,
    isDecimal: true,
    displayValue: state.displayValue + ".",
  };
}

function handleDeleteDigit(state: NumberState): NumberState {
  if (state.displayValue.length <= 1) {
    return {
      value: 0,
      isDecimal: false,
      decimalPlaces: 0,
      displayValue: "0",
    };
  }

  const newValue = state.displayValue.slice(0, -1);
  const rawNewValue = parseFloat(newValue.replace(/,/g, "") || "0");
  const formattedNewValue = formatDisplayValue(newValue);

  return {
    ...state,
    displayValue: formattedNewValue,
    value: rawNewValue,
    isDecimal: newValue.includes("."),
    decimalPlaces: newValue.includes(".")
      ? newValue.split(".")[1]?.length || 0
      : 0,
  };
}

function handleClearAll(): NumberState {
  return {
    value: 0,
    isDecimal: false,
    decimalPlaces: 0,
    displayValue: "0",
  };
}

function formatDisplayValue(displayValue: string): string {
  const [integerPart, decimalPart = ""] = displayValue.split(".");
  const formattedInteger = addCommasToInteger(integerPart);

  if (decimalPart) {
    return `${formattedInteger}.${decimalPart}`;
  }

  return formattedInteger;
}

function addCommasToInteger(integerPart: string): string {
  const number = parseFloat(integerPart.replace(/,/g, ""));
  return number.toLocaleString("en-US");
}

function useNumber() {
  const [state, dispatch] = useReducer(numberReducer, {
    displayValue: "0",
    value: 0,
    isDecimal: false,
    decimalPlaces: 0,
  });

  const appendDigit = (digit: number) => {
    dispatch({ type: "APPEND_DIGIT", digit });
  };

  const addDecimalPoint = () => {
    dispatch({ type: "DECIMAL_POINT" });
  };

  const replaceDigit = (digit: number) => {
    dispatch({ type: "REPLACE_DIGIT", digit });
  };

  const deleteDigit = () => {
    dispatch({ type: "DELETE_DIGIT" });
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  return {
    displayValue: state.displayValue,
    value: state.value,
    isDecimal: state.isDecimal,
    decimalPlaces: state.decimalPlaces,
    appendDigit,
    addDecimalPoint,
    replaceDigit,
    deleteDigit,
    clearAll,
  };
}

export default useNumber;
