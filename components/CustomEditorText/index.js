import React, { useRef, useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import { ErrorMessage } from "@hookform/error-message";

const CustomEditorText = ({ label, name, rules }) => {
  const { control, errors } = useFormContext();
  const editorRef = useRef();
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react"),
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setIsEditorLoaded(true);
  }, []);

  if (!isEditorLoaded) {
    return "CARGANDO...";
  }

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ onChange, value }) => (
          <CKEditor
            editor={ClassicEditor}
            data={value || ""}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
          />
        )}
      />

      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <p className="text-danger">{message}</p>}
      </ErrorMessage>
    </Form.Group>
  );
};

export default CustomEditorText;
