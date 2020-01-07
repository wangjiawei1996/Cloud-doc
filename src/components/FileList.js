import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash,faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import { nodeInternals } from 'stack-utils';
const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [ editStatus, setEditStatus ] = useState(false)
  const [ value, setValue] = useState('')
  const closeSearch = (editItem) => {
    setEditStatus(false);
    setValue('');
    if (editItem.isNew) {
      onFileDelete(editItem.id)
    }
  }
  useEffect(() => {
    const handleInputEvent = (event) => {
      const { keyCode } = event
      const editItem = files.find(file => file.id === editStatus)
      if (keyCode === 13 && editStatus && value.trim() !== '') {
        onSaveEdit(editItem.id, value, editItem.isNew)
        setEditStatus(false)
        setValue('')
      } else if (keyCode === 27 && editStatus) {
        closeSearch(editItem)
      }
    }
    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
    }
  })
  useEffect(() => {
    const newFile = files.find(file => file.isNew)
    if (newFile) {
      setEditStatus(newFile.id)
      setValue(newFile.title)
    }
  }, [files])
   return (
     <ul className="list-group list-group-flush file-list">
       {
         files.map(file => (
           <li
             className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
             key={file.id}
           >
            { (file.id !== editStatus && !file.isNew) &&
            <>
              <span className="col-2">
                <FontAwesomeIcon
                  size="lg"
                  icon={faMarkdown}
                />
              </span>
              <span
                className="col-6 c-link"
                onClick={() => {onFileClick(file.id)}}
              >
                {file.title}
              </span>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => { setEditStatus(file.id); setValue(file.title)}}
              >
                <FontAwesomeIcon
                  title="编辑"
                  size="lg"
                  icon={faEdit}
                />
              </button>
              <button
                type="button"
                className="icon-button col-2 "
                onClick={() => { onFileDelete(file.id)}}
              >
                <FontAwesomeIcon
                  title="删除"
                  size="lg"
                  icon={faTrash}
                />
              </button>
            </>
            }
            {
              ((file.id === editStatus) || file.isNew) &&
              <>
                <input
                  className="form-control col-10"
                  value={value}
                  placeholder="请输入文件名称"
                  onChange={(e) => { setValue(e.target.value)}}
                />
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={() => {closeSearch(file)}}
                >
                <FontAwesomeIcon
                  title="关闭"
                  size='lg'
                  icon={faTimes}
                />
                </button>
              </>
            }
           </li>
         ))
       }
     </ul>
   )
}
FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func
}
export default FileList