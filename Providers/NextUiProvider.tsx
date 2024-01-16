"use client";

import React from 'react';
import {NextUIProvider} from '@nextui-org/react'
import UserState from "@/Redux/UserState";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
      UserState,
    },
  });

export default function NextUiProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
          <Provider store={store}>{children}</Provider>
        </NextUIProvider>
      );
}