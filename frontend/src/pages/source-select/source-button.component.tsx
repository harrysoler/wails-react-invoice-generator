import { Button } from "@/components/ui/button";

interface SourceButtonProps extends React.ComponentProps<"button"> {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
};

export function SourceButton(props: SourceButtonProps) {
  return (
    <li className="min-w-full">
      <Button variant="outline" size="block" {...props}>
        <props.icon />
        {props.title}
      </Button>
    </li>
  );
}
