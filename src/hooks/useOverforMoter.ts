import { useAppSelector } from "./hooks";

export const useOverforMoter: () => {
  moterMarkertForOverforing: string[];
  dialogmoterMarkertForOverforing: string[];
  overforMoterFeilet: boolean;
  overforDialogmoterFeilet: boolean;
  moterOverfort: boolean;
  dialogmoterOverfort: boolean;
  overforerMoter: boolean;
  overforerDialogmoter: boolean;
  antallMoterOverfort?: number;
  antallDialogmoterOverfort?: number;
} = () => {
  const {
    moter: moterMarkertForOverforing,
    dialogmoter: dialogmoterMarkertForOverforing,
    overforerMoter,
    overforerDialogmoter,
    overforMoterFeilet,
    overforDialogmoterFeilet,
    moterOverfort,
    dialogmoterOverfort,
    antallMoterOverfort,
    antallDialogmoterOverfort,
  } = useAppSelector((state) => state.overfor);

  return {
    moterMarkertForOverforing,
    dialogmoterMarkertForOverforing,
    overforerMoter,
    overforerDialogmoter,
    overforMoterFeilet,
    overforDialogmoterFeilet,
    moterOverfort,
    dialogmoterOverfort,
    antallMoterOverfort,
    antallDialogmoterOverfort,
  };
};
