import { useSelector } from "react-redux";

export const useOverforMoter = () => {
  const {
    data: moterMarkertForOverforing,
    sender: overtarMoter,
    sendingFeilet: overtaMoterFeilet,
    sendt: harOvertattMoter,
  } = useSelector((state) => state.overfor);

  return {
    moterMarkertForOverforing,
    overtarMoter,
    overtaMoterFeilet,
    harOvertattMoter,
  };
};
