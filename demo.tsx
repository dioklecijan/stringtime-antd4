import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Button, DatePicker, Form, TimePicker } from 'antd';
import moment from 'moment';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const App: React.FC = () => {
  const onFinish = (fieldsValue: any) => {
    // Should format date value before submit.

    const values = {
      ...fieldsValue,
      'date-time-picker': fieldsValue['date-time-picker'],
    };
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="time_related_controls"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        'date-time-picker': null,
      }}
    >
      <Form.Item name="date-time-picker" label="DatePicker[showTime]">
        <DateTimeSelector showTime format="DD.MM.YYYY HH:mm" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;

/**
 * Custom datetime picker that use ISO string as value. Accepts and returns null and undefined value.
 */
type IDateTimeSelectorProps = {
  value?: string;
  onChange?: (value: string | null | undefined) => void;
  format?: string;
  showTime?: boolean;
};

const DateTimeSelector = ({
  value,
  onChange,
  format = 'DD.MM.YYYY HH:mm',
  showTime = true,
}: IDateTimeSelectorProps) => {
  const changeHandler = (date: moment, datestring: string) => {
    console.log({ date, datestring, x: typeof date });
    if (onChange) {
      date ? onChange(date.toISOString()) : onChange(date);
    }
  };

  return (
    <DatePicker
      showTime={showTime}
      format={format}
      onChange={changeHandler}
      value={value ? moment(value) : null}
    />
  );
};
