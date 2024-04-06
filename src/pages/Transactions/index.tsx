import { Key, useEffect, useState } from 'react';
import { Table, Form, Typography, Popconfirm, Button } from 'antd';
import { useStore } from 'effector-react';
import { EditableCell } from '@/pages/Transactions/EditableCell';
import { transactionsStores, transactionsEvents } from '@/shared/model/transactions';
import { Title } from '@/pages/Users/styles';

export const TransactionsPage = () => {
    const transactions = useStore(transactionsStores.transactions);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [transactionsState, setTransactionsState] = useState(transactions);
    const quinesClient1 = transactionsState.filter(({ midjourneyClientId }) => midjourneyClientId === '1');
    const quinesClient2 = transactionsState.filter(({ midjourneyClientId }) => midjourneyClientId === '2');
    const quinesClient3 = transactionsState.filter(({ midjourneyClientId }) => midjourneyClientId === '3');

    const isEditing = (record: any) => record.key === editingKey;

    const edit = (record: any) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: Key) => {
        try {
            const row = (await form.validateFields()) as any;

            const newData = [...transactionsState];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                transactionsEvents.updateTransactionFn({ ...item, ...row });
                setTransactionsState(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setTransactionsState(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    useEffect(() => {
        transactionsEvents.getTransactionsFn();
    }, []);

    useEffect(() => {
        setTransactionsState(transactions);
    }, [transactions]);

    return (
        <Form form={form} component={false}>
            <Title>
                Если зависло в статусе running, то нажми Edit и напиши waiting start <br />
                Если записло в статусе waiting start, то нажми Edit и напиши badRequest
            </Title>
            {[quinesClient1, quinesClient2, quinesClient3].map((quinesClient, index) => (
                <div key={index}>
                    <Title>
                        Клиент {index + 1} ({index === 0 ? 'Jetirock' : index === 1 ? 'Bugakill' : 'deadshot'}). Ожидают
                        запуска: {quinesClient.filter(({ stage }) => stage === 'waiting start').length}, Запущено:{' '}
                        {quinesClient.filter(({ stage }) => stage === 'running').length}
                    </Title>
                    <Table
                        dataSource={quinesClient}
                        rowClassName="editable-row"
                        bordered
                        components={{
                            body: {
                                cell: EditableCell
                            }
                        }}
                    >
                        <Table.Column key="N" dataIndex="N" title="№" render={(_, __, index) => <>{index + 1}</>} />
                        <Table.Column key="dateQuery" dataIndex="dateQuery" title="Дата запроса" />
                        <Table.Column key="leadTime" dataIndex="leadTime" title="Время выполнения" />
                        <Table.Column
                            key="prompt"
                            dataIndex="prompt"
                            title="prompt"
                            onCell={record => ({
                                inputType: 'text',
                                dataIndex: 'prompt',
                                title: 'prompt',
                                editing: isEditing(record)
                            })}
                        />
                        <Table.Column key="action" dataIndex="action" title="Действие" />
                        <Table.Column
                            key="stage"
                            dataIndex="stage"
                            title="Этап выполнения"
                            onCell={record => ({
                                inputType: 'text',
                                dataIndex: 'stage',
                                title: 'stage',
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
                </div>
            ))}
        </Form>
    );
};
