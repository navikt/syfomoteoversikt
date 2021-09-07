import { dialogmoterQueryKeys } from "@/data/dialogmoter/dialogmoterQueryHooks";
import { moterQueryKeys } from "@/data/moter/moterQueryHooks";
import { veilederQueryKeys } from "@/data/veiledere/veilederQueryHooks";
import { brukerQueryKeys } from "@/data/bruker/brukerQueryHooks";
import { QueryClient } from "react-query";
import {
  aktivEnhetMock,
  aktorMock,
  brukerFnr,
  brukerMock,
  orgnr,
  virksomhetMock,
} from "./data";
import { DialogmoterDTO } from "@/data/dialogmoter/dialogmoterTypes";
import { MoteDTO } from "@/data/moter/moterTypes";
import { VeilederDto } from "@/data/veiledere/veilederTypes";
import { virksomhetQueryKeys } from "@/data/virksomhet/virksomhetQueryHooks";

export const mockDialogmoteQuery = (
  queryClient: QueryClient,
  dialogmoter: DialogmoterDTO[]
) => {
  queryClient.setQueryData(
    dialogmoterQueryKeys.dialogmoter(aktivEnhetMock),
    () => dialogmoter
  );
};

export const mockMoterEnhetQuery = (
  queryClient: QueryClient,
  moter: MoteDTO[]
) =>
  queryClient.setQueryData(
    moterQueryKeys.moterEnhet(aktivEnhetMock),
    () => moter
  );

export const mockVeiledersMoterQuery = (
  queryClient: QueryClient,
  moter: MoteDTO[]
) => queryClient.setQueryData(moterQueryKeys.moter, () => moter);

export const mockVeilederQuery = (
  queryClient: QueryClient,
  veileder: VeilederDto
) =>
  queryClient.setQueryData(
    veilederQueryKeys.veilederByIdent(veileder.ident),
    () => veileder
  );

export const mockAktivVeilederQuery = (
  queryClient: QueryClient,
  veileder: VeilederDto
) => queryClient.setQueryData(veilederQueryKeys.veileder, () => veileder);

export const mockBrukerQuery = (queryClient: QueryClient) =>
  queryClient.setQueryData(
    brukerQueryKeys.brukerinfo(brukerFnr),
    () => brukerMock
  );

export const mockFnrQuery = (queryClient: QueryClient) =>
  queryClient.setQueryData(brukerQueryKeys.fnr(brukerFnr), () => aktorMock);

export const mockVirksomhetQuery = (queryClient: QueryClient) =>
  queryClient.setQueryData(
    virksomhetQueryKeys.virksomhet(orgnr),
    () => virksomhetMock
  );
