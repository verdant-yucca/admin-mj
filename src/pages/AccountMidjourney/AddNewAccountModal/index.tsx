import React, { FC, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { accountsEvents } from '@/shared/model/accountMidjourney';

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const AddNewAccountModal: FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        const row = (await form.validateFields()) as any;
        accountsEvents.createAccountMidjourneyFn(row);
        setIsModalOpen(false);
    };

    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
            <Form form={form} component={false}>
                <Form.Item
                    name="customId"
                    label="id"
                    rules={[
                        {
                            required: true,
                            message: `заполни эту хуйню!`
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: `заполни эту хуйню!`
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ServerId"
                    label="Discord server id"
                    rules={[
                        {
                            required: true,
                            message: `заполни эту хуйню!`
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                        {
                            required: true,
                            message: `заполни эту хуйню!`
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ChannelId"
                    label="discord channel id"
                    rules={[
                        {
                            required: true,
                            message: `заполни эту хуйню!`
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="DiscordToken"
                    label="Discord token"
                    rules={[
                        {
                            required: true,
                            message: `заполни эту хуйню!`
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddNewAccountModal;
