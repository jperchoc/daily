import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = (props: {value: string, onChange: (val: string) => void}) => {
  return (
      <>
    <ReactQuill theme="snow" value={props.value} onChange={(newVal) => props.onChange(newVal)}/>
    </>
  );
}

export default Editor;