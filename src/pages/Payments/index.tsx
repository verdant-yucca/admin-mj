import { Key, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { Line } from '@ant-design/charts';
import { Table, Form, Typography, Popconfirm, Button } from 'antd';
import { usersEvents, usersStores } from '../../shared/model/users';
import { Title } from './styles';
import { format } from 'date-fns';
import { EditableCell } from './EditableCell';

export const PaymentsPage = () => {
    const usersCountByDays = useStore(usersStores.usersCountByDays);
    const users = useStore(usersStores.users);
    const [usersState, setUsersState] = useState(users);

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: any) => record.key === editingKey;

    const edit = (record: Partial<any> & { key: Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    useEffect(() => {
        usersEvents.getUsersFn({
            page: '1',
            pageSize: '3000'
        });
    }, []);

    useEffect(() => {
        setUsersState(users);
    }, [users]);

    if (!usersCountByDays?.length) return null;
    return (
        <>
            <Title>Платежи</Title>
            <Table
                dataSource={[]}
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
                <Table.Column key="chatId" width="100px" dataIndex="chatId" title="id" />
                <Table.Column
                    key="username"
                    dataIndex="username"
                    width="100px"
                    title="@Username"
                    onFilter={(value: string, record) => record.username.startsWith(value)}
                    filterSearch={true}
                />
                <Table.Column
                    title="Имя"
                    width="350px"
                    render={(_, record) => record.firstName + ' ' + record.lastName}
                />
                <Table.Column
                    title="Дата регистрации"
                    width="20px"
                    sorter={(a, b) => new Date(a.createDate) - new Date(b.createDate)}
                    render={(_, record) => format(new Date(record.createDate), 'dd/MM/yyyy')}
                />
                <Table.Column
                    title="Сделал запросов"
                    render={(_, record) => record.countCompletedRequests || 0}
                    sorter={(a, b) => a.countCompletedRequests - b.countCompletedRequests}
                    onCell={(record: Item) => ({
                        inputType: 'string',
                        dataIndex: 'countCompletedRequests',
                        title: 'Сделал запросов',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    title="Осталось платных запросов"
                    render={(_, record) => record.countQueries || 0}
                    sorter={(a, b) => a.countQueries - b.countQueries}
                    onCell={(record: Item) => ({
                        inputType: 'number',
                        dataIndex: 'countQueries',
                        title: 'Запросы',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    title="Платеж руб"
                    render={(_, record) => record.asd || 0}
                    sorter={(a, b) => a.asd - b.asd}
                    onCell={(record: Item) => ({
                        inputType: 'number',
                        dataIndex: 'asd',
                        title: 'Платеж руб',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    title="Платеж колво"
                    render={(_, record) => record.asd || 0}
                    sorter={(a, b) => a.asd - b.asd}
                    onCell={(record: Item) => ({
                        inputType: 'number',
                        dataIndex: 'asd',
                        title: 'Платеж колво',
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
        </>
    );
};
