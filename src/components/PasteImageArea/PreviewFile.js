import React, { useEffect, useState } from 'react'
import { useFiles, useFilesRemove } from '../../contexts/FilesContext';
import FilePreviewItem from './FilePreviewItem/FilePreviewItem';
import './PreviewFile.css'
const fileImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/File_alt_font_awesome.svg/1024px-File_alt_font_awesome.svg.png'
export default function PasteImageArea() {
  const files = useFiles();
  const removeFiles = useFilesRemove();
  const [filePreview, setFilePreview] = useState([]);

  useEffect(() => {
    if (files.length > 0) {
      const list = [];
      files.forEach((file) => {
        if (file.type.includes("image")) {
          list.push({ type: 'image', url: URL.createObjectURL(file) });
        } else {
          list.push({ type: 'other', url: fileImage, name: file.name });
        }
      })
      setFilePreview(list)
    }
  }, [files])

  return (
    <div className='input-preview-area'>
      {filePreview.length > 0 && filePreview.map((file, index) => {
        return (
          <FilePreviewItem
            removeFiles={removeFiles}
            file={file}
            index={index}
            key={index}
          />
        )
      })}
    </div >
  )
}
