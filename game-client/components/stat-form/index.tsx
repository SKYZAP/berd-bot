import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, InputNumber, Space, Typography } from 'antd';
import { useState } from 'react';

const StatForm = (points: number, form: any) => {
  const [totalPoints, setTotalPoints] = useState(points);
  const [strVal, setStrVal] = useState(10);
  const [dexVal, setDexVal] = useState(10);
  const [conVal, setConVal] = useState(10);
  const [intVal, setIntVal] = useState(10);
  const [wisVal, setWisVal] = useState(10);
  const [chaVal, setChaVal] = useState(10);

  const MinusStat = () => {
    if (totalPoints >= 0 && strVal > 10) {
      console.log(strVal - 1);
      setStrVal(strVal - 1);
      setTotalPoints(totalPoints + 1);
      form.setFieldsValue({ strength: strVal - 1 });
    }
  };

  const AddStat = () => {
    if (totalPoints >= 1 && strVal >= 10) {
      console.log(strVal + 1);
      setStrVal(strVal + 1);
      setTotalPoints(totalPoints - 1);
      form.setFieldsValue({ strength: strVal + 1 });
    }
  };

  return (
    <div>
      <Typography.Title
        level={5}
        style={{ textAlign: 'center', paddingBottom: '15px' }}
      >
        Total Points: {totalPoints}
      </Typography.Title>
      <Form.Item
        label="Strength"
        name="strength"
        labelCol={{ span: 10 }}
        labelAlign="left"
      >
        <InputNumber
          style={{ textAlign: 'center' }}
          addonAfter={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                if (totalPoints >= 1 && strVal >= 10) {
                  const value = strVal + 1;
                  setStrVal(value);
                  setTotalPoints(totalPoints - 1);
                  form.setFieldsValue({ strength: value });
                }
              }}
            />
          }
          addonBefore={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<MinusOutlined />}
              onClick={() => {
                if (totalPoints >= 0 && strVal > 10) {
                  const value = strVal - 1;
                  setStrVal(value);
                  setTotalPoints(totalPoints + 1);
                  form.setFieldsValue({ strength: value });
                }
              }}
            />
          }
          readOnly
          value={strVal}
          min={10}
          max={100}
        />
      </Form.Item>
      <Form.Item
        label="Dexterity"
        name="dexterity"
        labelCol={{ span: 10 }}
        labelAlign="left"
      >
        <InputNumber
          style={{ textAlign: 'center' }}
          addonAfter={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                if (totalPoints >= 1 && dexVal >= 10) {
                  const value = dexVal + 1;
                  setDexVal(value);
                  setTotalPoints(totalPoints - 1);
                  form.setFieldsValue({ dexterity: value });
                }
              }}
            />
          }
          addonBefore={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<MinusOutlined />}
              onClick={() => {
                if (totalPoints >= 0 && dexVal > 10) {
                  const value = dexVal - 1;
                  setDexVal(value);
                  setTotalPoints(totalPoints + 1);
                  form.setFieldsValue({ dexterity: value });
                }
              }}
            />
          }
          readOnly
          value={strVal}
          min={10}
          max={100}
        />
      </Form.Item>
      <Form.Item
        label="Constitution"
        name="constitution"
        labelCol={{ span: 10 }}
        labelAlign="left"
      >
        <InputNumber
          style={{ textAlign: 'center' }}
          addonAfter={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                if (totalPoints >= 1 && conVal >= 10) {
                  const value = conVal + 1;
                  setConVal(value);
                  setTotalPoints(totalPoints - 1);
                  form.setFieldsValue({ constitution: value });
                }
              }}
            />
          }
          addonBefore={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<MinusOutlined />}
              onClick={() => {
                if (totalPoints >= 0 && conVal > 10) {
                  const value = conVal - 1;
                  setConVal(value);
                  setTotalPoints(totalPoints + 1);
                  form.setFieldsValue({ constitution: value });
                }
              }}
            />
          }
          readOnly
          value={strVal}
          min={10}
          max={100}
        />
      </Form.Item>
      <Form.Item
        label="Intelligence"
        name="intelligence"
        labelCol={{ span: 10 }}
        labelAlign="left"
      >
        <InputNumber
          style={{ textAlign: 'center' }}
          addonAfter={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                if (totalPoints >= 1 && intVal >= 10) {
                  const value = intVal + 1;
                  setIntVal(value);
                  setTotalPoints(totalPoints - 1);
                  form.setFieldsValue({ intelligence: value });
                }
              }}
            />
          }
          addonBefore={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<MinusOutlined />}
              onClick={() => {
                if (totalPoints >= 0 && intVal > 10) {
                  const value = intVal - 1;
                  setIntVal(value);
                  setTotalPoints(totalPoints + 1);
                  form.setFieldsValue({ intelligence: value });
                }
              }}
            />
          }
          readOnly
          value={strVal}
          min={10}
          max={100}
        />
      </Form.Item>
      <Form.Item
        label="Wisdom"
        name="wisdom"
        labelCol={{ span: 10 }}
        labelAlign="left"
      >
        <InputNumber
          style={{ textAlign: 'center' }}
          addonAfter={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                if (totalPoints >= 1 && wisVal >= 10) {
                  const value = wisVal + 1;
                  setWisVal(value);
                  setTotalPoints(totalPoints - 1);
                  form.setFieldsValue({ wisdom: value });
                }
              }}
            />
          }
          addonBefore={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<MinusOutlined />}
              onClick={() => {
                if (totalPoints >= 0 && wisVal > 10) {
                  const value = wisVal - 1;
                  setWisVal(value);
                  setTotalPoints(totalPoints + 1);
                  form.setFieldsValue({ wisdom: value });
                }
              }}
            />
          }
          readOnly
          value={strVal}
          min={10}
          max={100}
        />
      </Form.Item>
      <Form.Item
        label="Charisma"
        name="charisma"
        labelCol={{ span: 10 }}
        labelAlign="left"
      >
        <InputNumber
          style={{ textAlign: 'center' }}
          addonAfter={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                if (totalPoints >= 1 && chaVal >= 10) {
                  const value = chaVal + 1;
                  setChaVal(value);
                  setTotalPoints(totalPoints - 1);
                  form.setFieldsValue({ charisma: value });
                }
              }}
            />
          }
          addonBefore={
            <Button
              type="text"
              style={{ width: '100%' }}
              icon={<MinusOutlined />}
              onClick={() => {
                if (totalPoints >= 0 && chaVal > 10) {
                  const value = chaVal - 1;
                  setChaVal(value);
                  setTotalPoints(totalPoints + 1);
                  form.setFieldsValue({ charisma: value });
                }
              }}
            />
          }
          readOnly
          value={strVal}
          min={10}
          max={100}
        />
      </Form.Item>
    </div>
  );
};
export default StatForm;
