"use client";

import { MdClose } from "react-icons/md";

import IconButton from "@/components/IconButton";

import { BackgroundFilter, CloseButtonContainer, PopupContainer, PopupWrapper } from "./styles";

interface PopupProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  isMin?: boolean;
}

export default function Popup(props: PopupProps) {
  return (
    <BackgroundFilter onClick={props.close} $isOpen={props.isOpen.toString()}>
      <PopupContainer
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        $isMin={props.isMin ? "true" : "false"}>
        <PopupWrapper>
          <CloseButtonContainer>
            <IconButton icon={MdClose} onClick={props.close} label="close" />
          </CloseButtonContainer>
          {props.children}
        </PopupWrapper>
      </PopupContainer>
    </BackgroundFilter>
  );
}
