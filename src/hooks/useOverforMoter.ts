import { useAppSelector } from "./hooks";

export const useOverforMoter = () => {
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
