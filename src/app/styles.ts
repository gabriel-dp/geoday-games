"use client";

import Link from "next/link";
import styled from "styled-components";

export const MainContainer = styled.main`
  position: relative;
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

export const ConfigsContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;

  font-size: 0.875rem;
  color: ${(props) => props.theme.text};
  text-align: center;

  a {
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: ${(props) => props.theme.text};
  }

  p {
    font-size: 1rem;
    color: ${(props) => props.theme.text};
  }
`;

export const ModesContainer = styled.div`
  width: 100%;
  max-width: 40rem;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  gap: 1.5rem;
`;

export const ModeCard = styled(Link)`
  flex: 1 1 14rem;
  max-width: 18rem;
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.primary}44;
  border-radius: 0.75rem;
  background-color: ${(props) => props.theme.primary}09;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;

  &:hover {
    border-color: ${(props) => props.theme.primary};
    transform: translateY(-0.25rem);
  }

  svg {
    font-size: 2.5rem;
    color: ${(props) => props.theme.primary};
  }

  h2 {
    font-size: 1.25rem;
    color: ${(props) => props.theme.primary};
  }

  p {
    font-size: 0.875rem;
    color: ${(props) => props.theme.text};
  }
`;
