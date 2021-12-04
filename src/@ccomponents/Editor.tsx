
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Daily from '../@model/Daily';
import { debounce } from "lodash";
import { useEffect, useState } from 'react';
import './editorStyle.css'
import Api from '../@api/api';

const Editor = (props: {daily: Daily}) => {
  const [content, setContent] = useState('');

  useEffect(() => {
      setContent(props.daily.content);
  }, [props.daily]);

  const handleContentChange = (newContent:string) => {
    setContent(newContent);
    Api.putActivity(props.daily.id!, props.daily.getDateString(), newContent);
  };
  return (
    <ReactQuill theme="snow" 
      value={content} 
      onChange={debounce(
        (newVal:string) => handleContentChange(newVal),
        300
      )}/>
  );
}

export default Editor;