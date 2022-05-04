import React, { useContext, useState } from 'react'

const FilesContext = React.createContext();
const FilesUpdateContext = React.createContext();
const FilesRemoveContext = React.createContext();


export default function FilesProvider({ children }) {
  const [files, setFiles] = useState([]);

  function addFile(file) {
    setFiles([...files, file])
  }

  function removeFile(i) {
    setFiles(files.filter((image, index) => {
      return index !== i
    }))
  }

  return (
    <FilesContext.Provider value={files}>
      <FilesUpdateContext.Provider value={addFile}>
        <FilesRemoveContext.Provider value={removeFile}>
          {children}
        </FilesRemoveContext.Provider>
      </FilesUpdateContext.Provider>
    </FilesContext.Provider>
  )
}

export function useFiles() {
  return useContext(FilesContext);
}

export function useFilesUpdate() {
  return useContext(FilesUpdateContext);
}

export function useFilesRemove() {
  return useContext(FilesRemoveContext);
}

