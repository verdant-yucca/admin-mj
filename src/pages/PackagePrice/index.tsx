import { Table } from 'antd';

export const PackagePricePage = () => {
    const nameColumns = [
        {
            title: '№',
            dataIndex: '_id',
            key: '_id'
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Запросы',
            dataIndex: 'count',
            key: 'count'
        }
    ];

    const data = [
        {
            _id: '66065a7038c99b65c6cb6f11',
            name: 'Бомж пакет',
            price: 50,
            count: 10,
            dateCreate: '2024-03-29T06:06:40.563Z',
            __v: 0
        },
        {
            _id: '66065a7038c99b65c6cb6f12',
            name: 'Холоп пакет',
            price: 200,
            count: 50,
            dateCreate: '2024-03-29T06:06:40.564Z',
            __v: 0
        },
        {
            _id: '66065a7038c99b65c6cb6f13',
            name: 'Деловой паке',
            price: 600,
            count: 200,
            dateCreate: '2024-03-29T06:06:40.564Z',
            __v: 0
        },
        {
            _id: '66065a7038c99b65c6cb6f14',
            name: 'Боярский пакет',
            price: 1000,
            count: 500,
            dateCreate: '2024-03-29T06:06:40.564Z',
            __v: 0
        },
        {
            _id: '66065a7038c99b65c6cb6f15',
            name: 'Царский пакет',
            price: 1500,
            count: 1000,
            dateCreate: '2024-03-29T06:06:40.564Z',
            __v: 0
        }
    ];

    return <Table dataSource={data} columns={nameColumns} />;
};
