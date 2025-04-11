import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type CopyButtonProps = {
  value: string;
  className?: string;
};

export function CopyButton(props: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  async function copyToClipboard() {
    navigator.clipboard.writeText(props.value);
    setHasCopied(true);
  }

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-700 [&_svg]:h-3 [&_svg]:w-3",
        props.className,
      )}
      onClick={copyToClipboard}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <Copy />}
    </Button>
  );
}
