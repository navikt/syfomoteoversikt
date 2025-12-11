import React, { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Heading, Tabs } from "@navikt/ds-react";
import LinkAsTab from "@/components/LinkAsTab";
import { fullNaisUrlDefault } from "@/utils/miljoUtil";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
  enhetensMoterRoutePath,
  mineMoterRoutePath,
} from "@/routers/AppRouter";

const texts = {
  minOversikt: "Min oversikt",
  enhetensOversikt: "Enhetens oversikt",
  mineMoter: "Mine møter",
  enhetensMoter: "Enhetens møter",
  sokSykmeldt: "Søk etter sykmeldt",
};

export default function NavigasjonsTopp(): ReactElement {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Box background="surface-default" className="mb-4">
      <Tabs value={pathname} onChange={(value) => navigate(value)}>
        <Tabs.List>
          <LinkAsTab
            href={fullNaisUrlDefault("syfooversikt", "/minoversikt")}
            label={<Heading size="xsmall">{texts.minOversikt}</Heading>}
          />
          <LinkAsTab
            href={fullNaisUrlDefault("syfooversikt", "/enhet")}
            label={<Heading size="xsmall">{texts.enhetensOversikt}</Heading>}
          />
          <Tabs.Tab
            value={mineMoterRoutePath}
            label={<Heading size="xsmall">{texts.mineMoter}</Heading>}
          />
          <Tabs.Tab
            value={enhetensMoterRoutePath}
            label={<Heading size="xsmall">{texts.enhetensMoter}</Heading>}
          />
          <LinkAsTab
            href={fullNaisUrlDefault("syfooversikt", "/sok")}
            label={<Heading size="xsmall">{texts.sokSykmeldt}</Heading>}
            icon={<MagnifyingGlassIcon />}
          />
        </Tabs.List>
      </Tabs>
    </Box>
  );
}
