import React from 'react';
import { Form, Input, Flex, Button, Select, Card } from 'antd';
import { useMemoizedFn, useMount } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { RedoOutlined, ZoomInOutlined, PlusOutlined } from '@ant-design/icons';
import { FundTypeList } from '../dist';
import { ActionType } from '@/types';
import { useStore } from '../store';

const Filter = observer(() => {
    const store = useStore();
    const [form] = Form.useForm();

    const onSearch = useMemoizedFn(() => {
        store.listFetcher?.search?.submit?.();
    });

    const onReset = useMemoizedFn(() => {
        store.listFetcher?.search?.reset?.();
    });

    const onAdd = useMemoizedFn(() => {
        store.setModalPayload({
            type: ActionType.ADD,
            data: {},
        });
    });

    useMount(() => {
        store.setFilterForm(form);
    });

    return (
        <Card>
            <Form form={form} layout="inline">
                <Form.Item label="基金代码" name="code">
                    <Input />
                </Form.Item>
                <Form.Item label="基金名称" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="基金类型" name="type">
                    <Select style={{ width: 200 }} options={FundTypeList} />
                </Form.Item>
                <Flex gap={10}>
                    <Button type="primary" onClick={onSearch} icon={<ZoomInOutlined />}>
                        查询
                    </Button>
                    <Button type="primary" onClick={onReset} icon={<RedoOutlined />}>
                        重置
                    </Button>
                    <Button type="primary" onClick={onAdd} icon={<PlusOutlined />}>
                        新增
                    </Button>
                </Flex>
            </Form>
        </Card>
    );
});

export default Filter;
