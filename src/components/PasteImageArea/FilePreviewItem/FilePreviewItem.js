import React from 'react'

export default function FilePreviewItem({ removeFiles, file, index }) {
    return (
        <div className="preview-image-wrapper">
            <div className='remove-preview-image'
                onClick={() => { removeFiles(index) }}
            >
                x
            </div>
            {file.type === 'image'
                ? <img className='preview-image' src={file.url} alt="something" />
                : <div className='file-type-others-preview'>
                    <div className="file-others-image-wrapper">
                        <i data-visualcompletion="css-img" className="file-others-image"></i>
                    </div>
                    <p className='file-others-image-name'>{file.name}</p>
                </div>
            }
        </div>
    )
}
