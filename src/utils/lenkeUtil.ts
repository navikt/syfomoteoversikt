import { fullNaisUrlDefault } from "./miljoUtil";

export const syfomodiapersonMoterUrl = (fnr: string): string => {
  const path = `/sykefravaer/${fnr}/mote`;
  return fullNaisUrlDefault("syfomodiaperson", path);
};
