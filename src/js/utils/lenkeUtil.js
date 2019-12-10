import { fullNaisUrlDefault } from './miljoUtil';

export const syfomodiapersonMoterUrl = (fnr) => {
    const path = `/sykefravaer/${fnr}/mote`;
    return fullNaisUrlDefault('syfomodiaperson', path);
};
