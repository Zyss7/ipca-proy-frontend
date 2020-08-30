import { PickList } from "primereact/picklist";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

const CustomPickList = ({
  name,
  label,
  rules,
  source,
  itemTemplate,
  sourceHeader,
  targetHeader,
}) => {
  const [localSource, setlocalSource] = useState(source);
  const { control } = useFormContext();
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={rules}
        render={({ onChange, value }) => (
          <PickList
            source={localSource}
            target={value || []}
            itemTemplate={itemTemplate}
            sourceHeader={sourceHeader}
            targetHeader={targetHeader}
            showSourceControls={false}
            showTargetControls={false}
            responsive={true}
            onChange={(evt) => {
              setlocalSource(evt.source);
              onChange(evt.target);
            }}
          />
        )}
      />
    </Form.Group>
  );
};

export default CustomPickList;
