import { ReactNode } from "react";

type SourceButtonRowProps = {
  children: ReactNode | ReactNode[];
};

export function SourceButtonRow(props: SourceButtonRowProps) {
  return (
    <ul className="grid grid-flow-col auto-cols-fr gap-2">
      {Array.isArray(props.children)
        ? props.children.map((child) => <ButtonRowItem>{child}</ButtonRowItem>)
        : <ButtonRowItem>{props.children}</ButtonRowItem>}
    </ul>
  );
}

function ButtonRowItem({ children }: { children: ReactNode }) {
  return (
    <li className="w-full">
      {children}
    </li>
  );
}
