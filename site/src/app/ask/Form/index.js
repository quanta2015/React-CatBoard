/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import s from "./index.module.less";

const { TextArea } = Input;

const FormMain = ({ setSubmit }) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);

  const doSubmit = () => {
    setSubmit(true);
  };

  const onValuesChange = (changedValues, allValues) => {
    if (allValues.title && allValues.content) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <Form
      className={s.form}
      form={form}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        className={s.row}
        label="タイトル :"
        name="title"
        rules={[
          {
            required: true,
            message: "タイトルを入力してください",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className={s.row}
        label="内容  :"
        name="content"
        rules={[
          {
            required: true,
            message: "内容を入力してください",
          },
        ]}
      >
        <TextArea allowClear style={{ height: "300px" }} />
      </Form.Item>

      <Form.Item className={s.row}>
        <Button className={s.btn} onClick={doSubmit} disabled={disabled}>
          質問を投稿
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormMain;