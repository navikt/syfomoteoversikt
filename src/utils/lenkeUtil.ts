import { fullNaisUrlDefault } from "./miljoUtil";

export const syfomodiapersonMoterUrl = (fnr: string): string => {
  const path = `/sykefravaer/${fnr}/moteoversikt`;
  return fullNaisUrlDefault("syfomodiaperson", path);
};
