import React from 'react';
import { Link } from 'react-router';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import NavigasjonsTopp from '../../js/components/NavigasjonsTopp';

describe("NavigasjonsTopp", () => {
    it("Viser tre stk lenker dersom man sender inn 3 lenker", () => {
        const lenker = [
            {
            tittel: 'tittel1',
            url: '/url1',
            aktiv: false,
            },
            {
                tittel: 'tittel2',
                url: '/url2',
                aktiv: false,
            },
            {
                tittel: 'tittel3',
                url: '/url3',
                aktiv: false,
            },
        ];
        const combo = shallow(<NavigasjonsTopp lenker={lenker} />);
        expect(combo.find(Link)).to.have.length(3);
    });

    it("Viser lenke som aktiv", () => {
        const lenker = [
            {
                tittel: 'tittel1',
                url: '/url1',
                aktiv: true,
            },
        ];
        const combo = shallow(<NavigasjonsTopp lenker={lenker} />);
        expect(combo.find(".navigasjon__element__inner--active")).to.have.length(1);
    });

    it("Viser lenke som ikke aktiv", () => {
        const lenker = [
            {
                tittel: 'tittel1',
                url: '/url1',
                aktiv: false,
            },
        ];
        const combo = shallow(<NavigasjonsTopp lenker={lenker} />);
        expect(combo.find(".navigasjon__element__inner--active")).to.have.length(0);
    });
});
