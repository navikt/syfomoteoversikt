import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface Lenke {
  tittel: string;
  url: string;
  aktiv: boolean;
}

interface NavigasjonsToppProps {
  lenker: Lenke[];
}

const NavigasjonsLenke = styled.li`
  display: inline-block;
  padding-top: 0.25em;
  padding-bottom: 0.5em;
  padding-right: 0.5em;
  margin: 0 2em 0 0;

  text-transform: uppercase;

  a {
    font-weight: bold;
    text-decoration: none;
    color: black;
    font-size: 1.125em;
  }
`;

const StyledLink = styled(Link)<{ aktiv: number }>`
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.aktiv &&
    css`
      border-bottom: 4px var(--a-blue-500) solid;
    `}
  &:hover {
    border-bottom: 4px var(--a-blue-500) solid;
  }
`;

const NavigasjonsTopp = ({ lenker }: NavigasjonsToppProps): ReactElement => (
  <header>
    <ul className="py-4">
      {lenker.map((lenke) => (
        <NavigasjonsLenke key={lenke.url}>
          <StyledLink aktiv={lenke.aktiv ? 1 : 0} to={lenke.url}>
            {lenke.tittel}
          </StyledLink>
        </NavigasjonsLenke>
      ))}
    </ul>
  </header>
);

export default NavigasjonsTopp;
