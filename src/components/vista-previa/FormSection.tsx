
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemoriaTecnicaForm from "@/components/MemoriaTecnicaForm";
import WordDocumentTemplate from "@/components/WordDocumentTemplate";

interface FormSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
  onFormChange: (field: string, value: any) => void;
  onCalculationsChange: (field: string, value: string) => void;
  onExcelUpload: (data: any) => void;
  onWordTemplateUploaded: (file: File) => void;
  onGenerateWordDocument: () => void;
  hasWordTemplate: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  activeTab,
  setActiveTab,
  onFormChange,
  onCalculationsChange,
  onExcelUpload,
  onWordTemplateUploaded,
  onGenerateWordDocument,
  hasWordTemplate,
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-12 mb-6">
          <TabsTrigger value="form" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Formulario
          </TabsTrigger>
          <TabsTrigger value="word" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Base word
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="form" className="mt-6">
          <MemoriaTecnicaForm 
            onSubmit={() => {}} 
            onChange={onFormChange}
            onCalculationsChange={onCalculationsChange}
            onExcelUpload={onExcelUpload}
          />
        </TabsContent>
        
        <TabsContent value="word" className="mt-6">
          <WordDocumentTemplate 
            onTemplateUploaded={onWordTemplateUploaded}
            onDownloadDocument={onGenerateWordDocument}
            hasTemplate={hasWordTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormSection;
