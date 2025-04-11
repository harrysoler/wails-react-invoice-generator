import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export function ReturnButton() {
  const [_, navigate] = useLocation();

  const onClick = () => navigate("/");

  return (
    <Button variant="outline" onClick={onClick}>
      <ArrowLeft />Regresar
    </Button>
  );
}
