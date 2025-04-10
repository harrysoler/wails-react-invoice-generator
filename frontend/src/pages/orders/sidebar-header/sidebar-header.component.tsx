import { Button } from "@/components/ui/button";
import { SidebarHeader } from "@/components/ui/sidebar";
import { ArrowLeft, Search } from "lucide-react";
import logo from "@/assets/images/logo.webp";
import { Input } from "@/components/ui/input";
import { PlatformSelect } from "./platform-select.component";
import { CitySelect } from "./city-select.component";

export function OrdersSidebarHeader() {
  return (
    <SidebarHeader className="gap-3.5 border-b p-4">
      <div className="w-full h-9 flex justify-between">
        <Button>
          <ArrowLeft />Regresar
        </Button>
        <img src={logo} className="h-full w-auto"/>
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input placeholder="Filtrar ordenes..." className="pl-8" />
      </div>
      <div className="w-full flex flex-row gap-2">
        <PlatformSelect />
        <CitySelect />
      </div>
    </SidebarHeader>
  );
}
