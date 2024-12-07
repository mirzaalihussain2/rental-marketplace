import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { X } from 'lucide-react'

interface ImageUploadProps {
  onChange: (value: string[]) => void
  value: string[]
}

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = useCallback((result: any) => {
    onChange([...value, result.info.secure_url])
  }, [onChange, value])

  const removeImage = useCallback((imageUrl: string) => {
    onChange(value.filter(url => url !== imageUrl))
  }, [onChange, value])

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-1 right-1 z-10">
              <button
                onClick={() => removeImage(url)}
                className="p-1 bg-red-500 rounded-full text-white"
              >
                <X size={16} />
              </button>
            </div>
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={url}
              alt="Property"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="your-preset"
        options={{
          maxFiles: 10
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open?.()}
            className="p-4 border-2 border-dashed border-gray-300 w-full rounded-md hover:border-gray-400 transition"
          >
            Click to upload images
          </button>
        )}
      </CldUploadWidget>
    </div>
  )
} 