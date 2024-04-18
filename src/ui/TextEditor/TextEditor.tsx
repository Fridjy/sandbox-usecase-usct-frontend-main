import { useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./TextEditor.module.scss";

export default function TextEditor(props: ReactQuillProps) {
  const [modules] = useState({
    toolbar: [["bold", "italic", "underline"], ["clean"]],
  });
  return (
    <ReactQuill
      className={styles.quill}
      theme="snow"
      {...props}
      modules={modules}
    />
  );
}
