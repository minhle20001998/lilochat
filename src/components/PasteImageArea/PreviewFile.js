import React, { useEffect, useState } from 'react'
import { useFiles, useFilesRemove, useFilesUpdate } from '../../contexts/FilesContext';
import './PreviewFile.css'
const fileImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/File_alt_font_awesome.svg/1024px-File_alt_font_awesome.svg.png'
export default function PasteImageArea() {
  const files = useFiles();
  const updateFiles = useFilesUpdate();
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
        return <div className="preview-image-wrapper" key={index}>
          <div className='remove-preview-image'
            onClick={() => { removeFiles(index) }}
          >x
          </div>
          {file.type === 'image'
            ? <img className='preview-image' src={file.url} alt="something" />
            :
            <div className='file-type-others-preview'>
              <div className="file-others-image-wrapper">
                <i data-visualcompletion="css-img" className="file-others-image"></i>
              </div>
              <p className='file-others-image-name'>{file.name}</p>
            </div>
          }
        </div>
      })}
    </div >
  )
}
