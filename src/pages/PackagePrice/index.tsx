import { Key, useEffect, useState } from 'react';
import { Table, Form, Typography, Popconfirm, Button } from 'antd';
import { useStore } from 'effector-react';
import { EditableCell } from '@/pages/PackagePrice/EditableCell';
import { packagesEvents, packagesStores } from '@/shared/model/packages';

interface Item {
    key: string;
    name: string;
    price: number;
    count: number;
}

export const PackagePricePage = () => {
    const packages = useStore(packagesStores.packages);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...packages];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                packagesEvents.setPackagesFn(newData);
                packagesEvents.savePackagesFn({
                    ...item,
                    ...row
                });
                setEditingKey('');
            } else {
                newData.push(row);
                packagesEvents.setPackagesFn(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    useEffect(() => {
        packagesEvents.getPackagesFn();
    }, []);

    useEffect(() => {
        console.log(packages);
    }, [packages]);

    return (
        <Form form={form} component={false}>
            <Table
                dataSource={packages}
                rowClassName="editable-row"
                bordered
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
            >
                <Table.Column key="N" dataIndex="N" title="№" render={(_, __, index) => <>{index + 1}</>} />
                <Table.Column
                    key="name"
                    dataIndex="name"
                    title="Название"
                    onCell={(record: Item) => ({
                        record,
                        inputType: 'text',
                        dataIndex: 'name',
                        title: 'Название',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    key="description"
                    dataIndex="description"
                    title="Описание"
                    onCell={(record: Item) => ({
                        record,
                        inputType: 'text',
                        dataIndex: 'description',
                        title: 'Описание',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    key="price"
                    dataIndex="price"
                    title="Цена"
                    onCell={(record: Item) => ({
                        record,
                        inputType: 'number',
                        dataIndex: 'price',
                        title: 'Цена',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    key="count"
                    dataIndex="count"
                    title="Запросы"
                    onCell={(record: Item) => ({
                        record,
                        inputType: 'number',
                        dataIndex: 'count',
                        title: 'Запросы',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    key="photoUrl"
                    dataIndex="photoUrl"
                    title="Картинка"
                    onCell={(record: Item) => ({
                        record,
                        inputType: 'string',
                        dataIndex: 'photoUrl',
                        title: 'Картинка',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    key="photoWidth"
                    dataIndex="photoWidth"
                    title="Ширина"
                    onCell={(record: Item) => ({
                        record,
                        inputType: 'string',
                        dataIndex: 'photoWidth',
                        title: 'Ширина',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    key="photoHeight"
                    dataIndex="photoHeight"
                    title="Высота"
                    onCell={(record: Item) => ({
                        record,
                        inputType: 'string',
                        dataIndex: 'photoHeight',
                        title: 'Высота',
                        editing: isEditing(record)
                    })}
                />
                <Table.Column
                    key="edit"
                    dataIndex="edit"
                    title="Edit"
                    render={(_: any, record: Item) => {
                        const editable = isEditing(record);
                        return editable ? (
                            <span>
                                <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                                    Save
                                </Typography.Link>
                                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Edit
                            </Typography.Link>
                        );
                    }}
                />
            </Table>
        </Form>
    );
};
