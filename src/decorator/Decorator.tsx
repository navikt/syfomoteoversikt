import React, { ReactElement, useCallback } from "react";
import NAVSPA from "@navikt/navspa";
import decoratorConfig from "./decoratorConfig";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { useAktivEnhet } from "@/context/aktivEnhet/AktivEnhetContext";
import { useAktivBruker } from "@/data/modiacontext/useAktivBruker";
import { DecoratorProps } from "@/decorator/decoratorProps";

const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
  "internarbeidsflate-decorator-v3"
);

const Decorator = (): ReactElement => {
  const { setAktivEnhet } = useAktivEnhet();
  const aktivBruker = useAktivBruker();

  const handlePersonsokSubmit = (nyttFnr: string) => {
    aktivBruker.mutate(nyttFnr, {
      onSuccess: () => {
        const host = "syfomodiaperson";
        const path = `/sykefravaer`;
        window.location.href = fullNaisUrlDefault(host, path);
      },
    });
  };

  const handleChangeEnhet = (nyEnhet: string) => {
    setAktivEnhet(nyEnhet);
  };

  const config = useCallback(decoratorConfig, [
    handlePersonsokSubmit,
    handleChangeEnhet,
  ])(handlePersonsokSubmit, handleChangeEnhet);

  return <InternflateDecorator {...config} />;
};

export default Decorator;
