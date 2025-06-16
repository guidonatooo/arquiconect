
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, File, X } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void;
  acceptedTypes?: string;
  maxFiles?: number;
}

const FileUpload = ({ onFilesChange, acceptedTypes = ".pdf,.doc,.docx,.dwg,.jpg,.png", maxFiles = 5 }: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (uploadedFiles.length + files.length > maxFiles) {
      alert(`Máximo de ${maxFiles} arquivos permitidos`);
      return;
    }

    const newFiles: UploadedFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type
    }));

    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          Arraste arquivos aqui ou clique para selecionar
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Formatos aceitos: PDF, DOC, DOCX, DWG, JPG, PNG (máx. {maxFiles} arquivos)
        </p>
        <Input
          type="file"
          accept={acceptedTypes}
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <Button asChild variant="outline">
          <label htmlFor="file-upload" className="cursor-pointer">
            Selecionar Arquivos
          </label>
        </Button>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Arquivos Anexados:</h4>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <File className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
