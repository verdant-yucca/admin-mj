import { Key, useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { Line } from '@ant-design/charts';
import { Table, Form, Typography, Popconfirm, Button } from 'antd';
import { usersEvents, usersStores } from '../../shared/model/users';
import { Title } from './styles';
import { format } from 'date-fns';
import { EditableCell } from './EditableCell';

export const UsersPage = () => {
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

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: Key) => {
        try {
            const row = (await form.validateFields()) as any;

            const newData = [...usersState];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                usersEvents.updateUserFn({ ...item, ...row });
                setUsersState(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setUsersState(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
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
            <Title>График отображает оличество новых пользователей в день</Title>
            <Line
                data={usersCountByDays}
                xField="date"
                yField="count"
                point={{
                    shapeField: 'square',
                    sizeField: 4
                }}
            />

            <Title>Пиздюки</Title>

            <Form form={form} component={false}>
                <Table
                    dataSource={usersState}
                    rowClassName="editable-row"
                    bordered
                    components={{
                        body: {
                            cell: EditableCell
                        }
                    }}
                >
                    <Table.Column key="N" dataIndex="N" title="№" render={(_, __, index) => <>{index + 1}</>} />
                    <Table.Column key="chatId" dataIndex="chatId" title="id" />
                    <Table.Column key="username" dataIndex="username" title="@Username" />
                    <Table.Column title="Имя" render={(_, record) => record.firstName + ' ' + record.lastName} />
                    <Table.Column title="Язык" render={(_, record) => record.languageCode || ''} />
                    <Table.Column
                        title="Дата регистрации"
                        render={(_, record) => format(new Date(record.createDate), 'dd/MM/yyyy')}
                    />
                    <Table.Column
                        title="Запросы"
                        render={(_, record) => record.countQueries || 0}
                        onCell={(record: Item) => ({
                            inputType: 'number',
                            dataIndex: 'countQueries',
                            title: 'Запросы',
                            editing: isEditing(record)
                        })}
                    />
                    <Table.Column
                        title="Бесплатные запросы"
                        render={(_, record) => record.countFreeQueries || 0}
                        onCell={(record: Item) => ({
                            inputType: 'number',
                            dataIndex: 'countFreeQueries',
                            title: 'Бесплатные запросы',
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
        </>
    );
};
