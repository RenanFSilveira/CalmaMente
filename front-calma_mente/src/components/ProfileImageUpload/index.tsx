// components/ProfileImageUpload.tsx

import React, { useState, ChangeEvent } from 'react';
import { CameraIcon, UserCircleIcon } from '@heroicons/react/24/outline'; 

interface ProfileImageUploadProps {
  
  currentImageUrl: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImageUrl,
  onImageChange,
  label = "Foto de Perfil",
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setPreviewUrl(url);
        
        // 2. Chama a função de upload (simulação ou lógica real)
        // Por simplificação, aqui apenas atualizamos o estado do formulário com o URL de visualização.
        // Em um projeto real, você faria o upload para um serviço (S3, Firebase, etc.) e usaria o URL retornado.
        onImageChange(url); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <label className="text-gray-700 font-semibold mb-3">{label}</label>
      
      {/* Área da Imagem de Perfil (Avatar) */}
      <div 
        className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 cursor-pointer shadow-lg"
        onClick={handleImageClick}
        title="Clique para adicionar/mudar foto"
      >
        {previewUrl ? (
          // Imagem de Pré-visualização
          <img 
            src={previewUrl} 
            alt="Pré-visualização do perfil" 
            className="w-full h-full object-cover" 
          />
        ) : (
          // Ícone Placeholder
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
             <UserCircleIcon className="h-20 w-20" />
          </div>
        )}
        
        {/* Ícone de Câmera sobreposto */}
        <div className="absolute inset-0 flex items-end justify-end p-1 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
            <CameraIcon className="h-6 w-6 text-white"/>
        </div>
      </div>
      
      {/* Input de Arquivo Escondido */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*" // Aceita apenas arquivos de imagem
        className="hidden"
      />
      
      <p className="text-sm text-gray-500 mt-2">Clique para selecionar.</p>
    </div>
  );
};

export default ProfileImageUpload;