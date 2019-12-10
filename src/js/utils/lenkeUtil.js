import { fullAppAdeoUrl } from './miljoUtil';

export const syfomodiapersonMoterUrl = (fnr) => {
    const path = `/sykefravaer/${fnr}/mote`;
    return fullAppAdeoUrl(path);
    //return fullNaisUrlDefault('syfomodiaperson', path);
};
