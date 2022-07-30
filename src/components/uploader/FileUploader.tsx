import { useState } from 'react';
import { Dropzone, FileItem, FileValidated, FullScreenPreview } from '@dropzone-ui/react';

export const FileUpdate = () => {
  const [files, setFiles] = useState<FileValidated[]>([]);

  const [imageSrc, setImageSrc] = useState<any>(undefined)

  const updateFiles = (incommingFiles: FileValidated[]) => {
    setFiles(incommingFiles)
  };

  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource: any) => {
    setImageSrc(imageSource)
  };

  const handleUpload = (response: any) => {
    console.log('responses', response);
  };

  return (
    <Dropzone onChange={updateFiles} value={files} style={{minWidth: 500}} maxFiles={5} maxFileSize={2998000} url="http://localhost:8000/api/katas/upload" onUploadFinish={handleUpload}>
      {files.map((file: FileValidated)=> (
        <FileItem {...file} preview key={file.id} info onDelete={removeFile} resultOnTooltip hd onSee={handleSee}/>
      ))}
      <FullScreenPreview imgSource={imageSrc} openImage={imageSrc} onClose={(e: any) => handleSee(undefined)} />
    </Dropzone>
  )
}