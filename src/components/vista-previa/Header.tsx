
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  hasWordTemplate: boolean;
  onGenerateWordDocument: () => void;
}

const Header: React.FC<HeaderProps> = ({ hasWordTemplate, onGenerateWordDocument }) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm py-4 px-6 md:px-10 border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Vista Previa de Memoria Técnica</h1>
        </div>
        {hasWordTemplate && (
          <Button 
            onClick={onGenerateWordDocument}
            className="flex gap-2 items-center"
          >
            <Download size={16} /> Descargar Word
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
