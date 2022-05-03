import React, { useEffect, useState } from 'react'
import './PasteImageArea.css'
export default function PasteImageArea({ pastedImages, setPastedImages }) {

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (pastedImages.length > 0) {
      const urls = pastedImages.map((img) => {
        return URL.createObjectURL(img)
      })
      setImageUrls(urls)
    }
  }, [pastedImages])

  const removePastedImage = (i) => {
    setPastedImages(pastedImages.filter((image, index) => {
      return index !== i
    }))
  }

  return (
    <div className='input-preview-area'>
      {imageUrls.length > 0 && imageUrls.map((url, index) => {
        return <div className="preview-image-wrapper" key={index}>
          <div className='remove-preview-image'
            onClick={() => { removePastedImage(index) }}
          >x
          </div>
          <img className='preview-image' src={url} alt="something" />
        </div>
      })}
    </div >
  )
}
