import { useRef, useState } from "react";
import { useAppStore } from "../store/useAppStore";

interface AvatarProps {
  onFileSelect: (file: File) => void;
}

export default function UserpageProfileAvatar({ onFileSelect }: AvatarProps) {
  const { user } = useAppStore.getState();

  const [preview, setPreview] = useState(user?.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div onClick={handleClick} className="w-24 h-24 rounded-full bg-neutral-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-shadow">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="w-full h-full bg-neutral-300">
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neutral-300" />
        )}
      </div>
    </div>
  );
}
