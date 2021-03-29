import { useAppSelector } from "./hooks";

export const useOverforMoter: () => {
  moterMarkertForOverforing: string[];
  overtaMoterFeilet: boolean;
  harOvertattMoter: boolean;
  overtarMoter: boolean;
} = () => {
  const {
    data: moterMarkertForOverforing,
    sender: overtarMoter,
    sendingFeilet: overtaMoterFeilet,
    sendt: harOvertattMoter,
  } = useAppSelector((state) => state.overfor);

  return {
    moterMarkertForOverforing,
    overtarMoter,
    overtaMoterFeilet,
    harOvertattMoter,
  };
};
