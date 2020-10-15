import React from "react";
import { Form } from "react-bootstrap";
import { Calendar } from "primereact/calendar";
import { useFormContext, Controller } from "react-hook-form";
import { spanishCalendar } from "@utils/CONS";
import classNames from "classnames";
import moment from "moment";

const CustomDateTimePicker = ({ name, label, rules }) => {
  const { control, errors } = useFormContext();

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        rules={rules}
        control={control}
        defaultValue={new Date()}
        render={({ onChange, value }) => {
          return (
            <Calendar
              className='w-100'
              value={value ? moment(value).toDate() : new Date()}
              locale={spanishCalendar}
              yearNavigator
              monthNavigator
              showButtonBar
              inputClassName={classNames({
                "p-invalid": !!errors[name],
              })}
              onClearButtonClick={(e) => onChange(null)}
              yearRange='1900:2050'
              dateFormat="DD  dd 'de' MM 'de' yy a las"
              formatOnChange='yy-mm-dd'
              hourFormat='24'
              showIcon
              showTime
              onChange={(e) => {
                onChange(moment(e.value).toISOString());
              }}
            />
          );
        }}
      />
    </Form.Group>
  );
};

export default CustomDateTimePicker;
