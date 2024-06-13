import React from 'react';
import { Table, TableColumnsType, Button, Modal, Flex } from 'antd';
import { useMemoizedFn, useRequest } from 'ahooks';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useStore } from '../store';
import { ActionType } from '@/types';
import { observer } from 'mobx-react-lite';
import { FundDataType } from '../types';

const DeleteBtn = observer(() => {
    const store = useStore();
    const delFetcher = useRequest(param => Promise.resolve({}), {
        manual: true,
        onSuccess: () => {
            store.listFetcher?.refresh?.();
        },
    });
    const onDelete = useMemoizedFn(() => {
        Modal.confirm({
            content: '确认删除该基金?',
            onOk: () => {
                delFetcher?.run?.({ id: '122' });
            },
        });
    });
    return (
        <Button icon={<DeleteOutlined />} type="link" color="red" onClick={onDelete}>
            删除
        </Button>
    );
});

const EditBtn = observer(({ data }: { data: FundDataType }) => {
    const store = useStore();
    const onEdit = useMemoizedFn(() => {
        store.setModalPayload({
            type: ActionType.EDIT,
            data: data,
        });
    });

    return (
        <Button icon={<EditOutlined />} type="link" color="red" onClick={onEdit}>
            编辑
        </Button>
    );
});

const FundTable = observer(() => {
    const store = useStore();

    const columns: TableColumnsType<FundDataType> = [
        {
            title: '基金代码',
            dataIndex: 'code',
            align: 'center',
        },
        {
            title: '基金名称',
            dataIndex: 'name',
            align: 'center',
        },
        {
            title: '基金经理',
            dataIndex: 'manager',
        },
        {
            title: '基金类型',
            dataIndex: 'type',
        },
        {
            title: '持仓成本',
            dataIndex: 'cost',
        },
        {
            title: '持有份额',
            dataIndex: 'share',
        },
        {
            title: '今日净值',
            dataIndex: 'worth',
        },
        {
            title: '操作',
            align: 'center',
            fixed: 'right',
            render: (value, record) => {
                return (
                    <Flex gap={10}>
                        <EditBtn data={record} />
                        <DeleteBtn />
                    </Flex>
                );
            },
        },
    ];
    return <Table rowKey="_id" bordered columns={columns} {...(store.listFetcher?.tableProps || {})} />;
});

export default FundTable;
