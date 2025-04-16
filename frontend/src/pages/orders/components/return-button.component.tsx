import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export function ReturnButton() {
  return (
    <Link href="/">
      <Button variant="outline" className="shadow-none">
        <ArrowLeft />Regresar
      </Button>
    </Link>
  );
}
