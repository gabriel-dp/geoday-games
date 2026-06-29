"use client";

import Popup from "@/components/Popup";
import { JSX, useState } from "react";

interface UsePopupConfigProps {
  isMin?: boolean;
}

export default function usePopup(
  component: JSX.Element,
  { isMin }: UsePopupConfigProps = {},
): [() => void, JSX.Element] {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const popupComponent = (
    <Popup isOpen={isOpen} close={close} isMin={isMin}>
      {component}
    </Popup>
  );

  return [open, popupComponent];
}
