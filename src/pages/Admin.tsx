import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert, Button, Avatar, Checkbox, List, Skeleton  } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import { useState } from 'react';

interface Person {
  id: number;
  name: string;
  picture: string;
  hasTalked?: boolean;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState([]); 

  const intl = useIntl();

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3004/persons');
    const data = await res.json();
    setUsers(data);
  }

  return (
    <PageHeaderWrapper
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'This page can only be viewed by admin',
      })}
    >
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
      <p style={{ textAlign: 'center', marginTop: 24 }}>
        Want to add more pages? Please refer to{' '}
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          use block
        </a>
      </p>
      <Button onClick={fetchUsers}>Fetch Users</Button>
      {users.length > 0 && <Users data={users} />}
    </PageHeaderWrapper>
  );
};

const Users = (props: {data: Person[]}) => {
  if (props.data.length === 0) return <></>;
  const listItem = (item:Person) => (
        <List.Item className="clickable" actions={[<Checkbox checked={item.hasTalked} />]}>
            <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta avatar={<Avatar src={item.picture} />} title={item.name} />
            </Skeleton>
        </List.Item>);

  return (
    <Card>
      <List
            locale={{ emptyText: "Everybody has talked" }}
            header={<div>Has NOT talked</div>}
            bordered
            itemLayout="horizontal"
            dataSource={props.data}
            renderItem={listItem}
        />
      </Card>
  )
} 

export default Admin;
