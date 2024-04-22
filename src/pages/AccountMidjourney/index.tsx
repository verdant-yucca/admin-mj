import React, { Key, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { Table, Form, Typography, Button } from 'antd';
import { Title } from './styles';
import { format } from 'date-fns';
import { EditableCell } from './EditableCell';
import { accountsEvents, accountsStores } from '@/shared/model/accountMidjourney';
import AddNewAccountModal from '@/pages/AccountMidjourney/AddNewAccountModal';

export const AccountMidjourneyPage = () => {
    const accounts = useStore(accountsStores.accounts);
    const [accountsState, setAccountsState] = useState(accounts);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: any) => record.key === editingKey;

    const edit = (record: Partial<any> & { key: Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: Key) => {
        try {
            const row = (await form.validateFields()) as any;

            const newData = [...accountsState];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                accountsEvents.updateAccountFn({ ...item, ...row });
                setAccountsState(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setAccountsState(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    useEffect(() => {
        accountsEvents.getAvailableAccountMidjourneyFn();
    }, []);

    useEffect(() => {
        setAccountsState(accounts);
    }, [accounts]);

    return (
        <>
            <AddNewAccountModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Title>Аккаунты. Всего {accountsState.length}шт.</Title>

            <Form form={form} component={false}>
                <Table
                    dataSource={accountsState}
                    rowClassName="editable-row"
                    bordered
                    components={{
                        body: {
                            cell: EditableCell
                        }
                    }}
                >
                    <Table.Column
                        key="N"
                        width="20px"
                        dataIndex="N"
                        title="№"
                        render={(_, __, index) => <>{index + 1}</>}
                    />
                    <Table.Column
                        key="name"
                        dataIndex="name"
                        width="100px"
                        title="name"
                        onFilter={(value: string, record) => record.name.startsWith(value)}
                        filterSearch={true}
                        onCell={(record: Item) => ({
                            inputType: 'text',
                            dataIndex: 'name',
                            title: 'name',
                            editing: isEditing(record)
                        })}
                    />
                    <Table.Column
                        title="id"
                        width="50px"
                        dataIndex={'customId'}
                        onCell={(record: Item) => ({
                            inputType: 'number',
                            dataIndex: 'customId',
                            title: 'id',
                            editing: isEditing(record)
                        })}
                    />
                    <Table.Column
                        title="status"
                        width="100px"
                        render={(_, record) => record.status}
                        onCell={(record: Item) => ({
                            inputType: 'text',
                            dataIndex: 'status',
                            title: 'status',
                            editing: isEditing(record)
                        })}
                    />
                    <Table.Column
                        title="Дата создания"
                        width="50px"
                        sorter={(a, b) => a.dateCreate - b.dateCreate}
                        render={(_, record) => record.dateCreate}
                    />
                    <Table.Column
                        title="ServerId"
                        render={(_, record) => record.ServerId}
                        sorter={(a, b) => a.ServerId - b.ServerId}
                        onCell={(record: Item) => ({
                            inputType: 'text',
                            dataIndex: 'ServerId',
                            title: 'ServerId',
                            editing: isEditing(record)
                        })}
                    />
                    <Table.Column
                        title="ChannelId"
                        render={(_, record) => record.ChannelId}
                        sorter={(a, b) => a.ChannelId - b.ChannelId}
                        onCell={(record: Item) => ({
                            inputType: 'text',
                            dataIndex: 'ChannelId',
                            title: 'ChannelId',
                            editing: isEditing(record)
                        })}
                    />
                    <Table.Column
                        title="DiscordToken"
                        render={(_, record) => record.DiscordToken}
                        sorter={(a, b) => a.DiscordToken - b.DiscordToken}
                        onCell={(record: Item) => ({
                            inputType: 'text',
                            dataIndex: 'DiscordToken',
                            title: 'DiscordToken',
                            editing: isEditing(record)
                        })}
                    />
                    <Table.Column
                        key="edit"
                        dataIndex="edit"
                        title="Edit"
                        render={(_: any, record: any) => {
                            const editable = isEditing(record);
                            return editable ? (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography.Link
                                        onClick={() => save(record.key)}
                                        style={{ margin: 0, marginBottom: 4, fontSize: '12px' }}
                                    >
                                        Save
                                    </Typography.Link>
                                    <Typography.Link onClick={cancel}>
                                        <a style={{ margin: 0, fontSize: '12px' }}>Cancel</a>
                                    </Typography.Link>
                                </div>
                            ) : (
                                <Typography.Link
                                    disabled={editingKey !== ''}
                                    onClick={() => edit(record)}
                                    style={{ fontSize: '12px' }}
                                >
                                    Edit
                                </Typography.Link>
                            );
                        }}
                    />
                </Table>
            </Form>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Add new account
            </Button>
        </>
    );
};
