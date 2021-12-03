import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Daily from '../@model/Daily';
import { debounce } from "lodash";
import { useEffect, useState } from 'react';
import './editorStyle.css'

const Editor = (props: {daily: Daily}) => {
  const [content, setContent] = useState('');

  useEffect(() => {
      setContent(props.daily.content);
  }, [props.daily]);

  const handleContentChange = (newContent:string) => {
    setContent(newContent);
    fetch("http://localhost:3004/activities/" + props.daily.id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        ...props.daily,
        content: newContent
      }),
    });
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