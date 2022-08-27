import { Button, Card, Form, Modal } from 'antd';
import { useState } from 'react';
import StatForm from '../../components/stat-form';

const GameContainer = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [form] = Form.useForm();

  const ShowModal = () => {
    setModalVisible(true);
  };
  const CloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <title>Game Screen</title>
      <Modal
        title="Create Your Character Card"
        visible={modalVisible}
        destroyOnClose={true}
        onCancel={CloseModal}
        onOk={CloseModal}
        footer={[
          <Button
            form="CreateCard"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          initialValues={{
            strength: 10,
            charisma: 10,
            constitution: 10,
            dexterity: 10,
            intelligence: 10,
            wisdom: 10,
          }}
          name="CreateCard"
          onFinish={(val) => {
            console.log('VAL: ', val);
          }}
        >
          {StatForm(12, form)}
        </Form>
      </Modal>
    </>
  );
};

export default GameContainer;
