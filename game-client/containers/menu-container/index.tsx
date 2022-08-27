import { Button, Card, Form, Input, Modal } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PlayerGQLFields } from '../../config';

const MenuStyle: React.CSSProperties = {
  width: '15em',
  margin: 'auto',
  textAlign: 'center',
  paddingTop: '20%',
};

const MenuContainer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const ShowModal = () => {
    setModalVisible(true);
  };
  const CloseModal = () => {
    setModalVisible(false);
  };

  const SubmitModal = (values: any) => {
    setModalVisible(false);
  };

  return (
    <div style={MenuStyle}>
      <title>Menu</title>
      <Card title="Menu">
        <Button type="primary" onClick={ShowModal}>
          Play
        </Button>
      </Card>
      <Modal
        title="Enter Your Details"
        visible={modalVisible}
        destroyOnClose={true}
        onCancel={CloseModal}
        onOk={CloseModal}
        footer={[
          <Button form="Player" key="submit" htmlType="submit" type="primary">
            Submit
          </Button>,
        ]}
      >
        <Form
          name="Player"
          onFinishFailed={(err) => {
            if (err) {
              setModalVisible(true);
            }
          }}
          onFinish={(val) => {
            console.log('VAL:', val);
            const gqlHeaders = new Headers();
            // gqlHeaders.append("Authorization", `Bearer ${user?.token}`);
            gqlHeaders.append('Content-Type', 'application/json');

            // Store Player data inside Cookies & publish to DB
            fetch(`${process.env.BASE_URL}/graphql`, {
              method: 'POST',
              headers: gqlHeaders,
              body: JSON.stringify({
                query: `mutation($input:CreatePlayerDto!){createPlayer(input:$input){${PlayerGQLFields}}}`,
                variables: {
                  input: { username: val.username, score: 0, battlesWon: 0 },
                },
              }),
            })
              .then((res) => {
                if (res.status === 200) router.push('/game');
              })
              .catch((err) => {
                throw new Error(`${err}`);
              });
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            labelCol={{ span: 5 }}
            labelAlign="left"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuContainer;
