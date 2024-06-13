import React from 'react';
import { useAntdTable, useDebounceEffect } from 'ahooks';
import { Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import Filter from './components/Filter';
import Table from './components/Table';
import Modal from './components/Modal';
import { useStore } from './store';

const GetTask = observer(() => {
    const store = useStore();
    const listFetcher = useAntdTable(
        () =>
            Promise.resolve({
                list: [{ _id: '552', name: '55665' }],
                total: 1,
            }),
        {
            form: store.filterForm,
        },
    );
    useDebounceEffect(
        () => {
            store.setListFetcher(listFetcher);
        },
        [listFetcher?.loading],
        {
            wait: 100,
        },
    );
    return <></>;
});

const Fund = () => {
    return (
        <Flex gap={10} vertical>
            <Filter />
            <Table />
            <Modal />
            <GetTask />
        </Flex>
    );
};

export default Fund;
