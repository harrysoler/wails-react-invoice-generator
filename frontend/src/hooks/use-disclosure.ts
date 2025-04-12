import { useState } from "react";

export function useDisclosure(initialValue: boolean) {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((value) => !value);

  return { isOpen, setIsOpen, open, close, toggle } as const;
}
