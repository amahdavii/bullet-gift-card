"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  id: number;
  amount: number;
  firstName: string;
  lastName?: string;
  message?: string;
  receivedType: string;
  receiveInput: string;
}

interface FormContextType {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
}

const defaultData: FormData = {
  id: 0,
  amount: 0,
  firstName: "",
  lastName: undefined,
  message: undefined,
  receivedType: "",
  receiveInput: "",
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FormData>(defaultData);

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
