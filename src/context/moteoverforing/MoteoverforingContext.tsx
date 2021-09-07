import React from "react";
import { MoteoverforingAction } from "@/context/moteoverforing/moteoverforingActions";
import {
  moteoverforingInitialState,
  MoteoverforingState,
} from "@/context/moteoverforing/moteoverforingState";
import { moteoverforingReducer } from "@/context/moteoverforing/moteoverforingReducer";

type MoteoverforingProviderProps = { children: React.ReactNode };

const MoteoverforingContext = React.createContext<{
  state: MoteoverforingState;
  dispatch: React.Dispatch<MoteoverforingAction>;
}>({
  state: moteoverforingInitialState,
  dispatch: () => undefined,
});

export const MoteoverforingProvider = ({
  children,
}: MoteoverforingProviderProps) => {
  const [moteoverforingState, dispatch] = React.useReducer(
    moteoverforingReducer,
    moteoverforingInitialState
  );
  return (
    <MoteoverforingContext.Provider
      value={{ state: moteoverforingState, dispatch }}
    >
      {children}
    </MoteoverforingContext.Provider>
  );
};

export const useMoteoverforing = () => {
  const context = React.useContext(MoteoverforingContext);
  if (context === undefined) {
    throw new Error(
      "useMoteoverforing must be used within a MoteoverforingProvider"
    );
  }

  const {
    state: {
      dialogmoterMarkert,
      moterMarkert,
      antallDialogmoterOverfort,
      antallMoterOverfort,
    },
    dispatch,
  } = context;
  const antallOverfort =
    antallMoterOverfort !== undefined || antallDialogmoterOverfort !== undefined
      ? (antallMoterOverfort || 0) + (antallDialogmoterOverfort || 0)
      : undefined;

  return {
    dispatch,
    antallOverfort,
    moterMarkert,
    dialogmoterMarkert,
  };
};
