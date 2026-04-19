import { useEffect, useRef, useState } from "react";

interface ThumbnailProps {
  onFileSelect: (file: File) => void;
  defaultThumbnail: string;
}

export default function MyEventDetailEditThumbnail({
  onFileSelect,
  defaultThumbnail,
}: ThumbnailProps) {
  const [preview, setPreview] = useState(defaultThumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (defaultThumbnail) {
      setPreview(defaultThumbnail);
    }
  }, [defaultThumbnail]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-48 h-40 rounded-lg bg-neutral-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-shadow"
    >
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
