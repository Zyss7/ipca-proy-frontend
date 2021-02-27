import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import es from 'suneditor/src/lang/es';

const CustomEditorText = ({ label, name, rules }) => {
  const { control, errors } = useFormContext();

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
        render={({ onChange, value }) => (
          <SunEditor
            setContents={value}
            onChange={onChange}
            height={300}
            setOptions={{
              mode: 'classic',
              katex: 'window.katex',
              charCounter: true,
              charCounterType: 'char',
              imageGalleryUrl:
                'https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo',
              videoFileInput: false,
              youtubeQuery: '',
              tableCellControllerPosition: '',
              tabDisable: true,
              shortcutsDisable: [
                'bold',
                'strike',
                'underline',
                'italic',
                'undo',
                'indent',
              ],
              templates: [
                {
                  name: 'Template-1',
                  html: '<p>HTML source1</p>',
                },
                {
                  name: 'Template-2',
                  html: '<p style="font-weight: 600;">HTML source2</p>',
                },
              ],
              buttonList: [
                [
                  'undo',
                  'redo',
                  'font',
                  'fontSize',
                  'formatBlock',
                  'paragraphStyle',
                  'blockquote',
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'subscript',
                  'superscript',
                  'fontColor',
                  'hiliteColor',
                  'textStyle',
                  'removeFormat',
                  'outdent',
                  'indent',
                  'align',
                  'horizontalRule',
                  'list',
                  'lineHeight',
                  'table',
                  'link',
                  'image',
                  'video',
                  'audio',
                  'math',
                  'imageGallery',
                  'fullScreen',
                  'showBlocks',
                  'codeView',
                  'preview',
                  'print',
                  'save',
                  'template',
                ],
              ],
              lang: lang.es,
              'lang(In nodejs)': 'es',
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

/*
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
        defaultValue=''
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
        {({ message }) => <p className='text-danger'>{message}</p>}
      </ErrorMessage>
    </Form.Group>
  );
};

export default CustomEditorText;

*/
