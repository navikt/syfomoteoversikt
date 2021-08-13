import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import NAVSPA from "@navikt/navspa";
import { DecoratorProps } from "./decoratorProps";
import decoratorConfig from "./decoratorConfig";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { setAktivEnhet } from "@/data/enhet/enhet_actions";

const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
  "internarbeidsflatefs"
);

const Decorator = (): ReactElement => {
  const dispatch = useDispatch();

  const handlePersonsokSubmit = (nyttFnr: string) => {
    const host = "syfomodiaperson";
    const path = `/sykefravaer/${nyttFnr}`;
    window.location.href = fullNaisUrlDefault(host, path);
  };

  const handleChangeEnhet = (nyEnhet: string) => {
    dispatch(setAktivEnhet(nyEnhet));
  };

  const config = useCallback(decoratorConfig, [
    handlePersonsokSubmit,
    handleChangeEnhet,
  ])(handlePersonsokSubmit, handleChangeEnhet);

  return <InternflateDecorator {...config} />;
};

export default Decorator;
