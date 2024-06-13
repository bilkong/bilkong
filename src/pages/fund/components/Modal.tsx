import React from 'react';
import { Modal, Form, FormInstance, Input, Select } from 'antd';
import { useMemoizedFn, useRequest, useMount } from 'ahooks';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { FundTypeList } from '../dist';
import { ActionType } from '@/types';
import _ from 'lodash-es';

const Content = observer(
  forwardRef((props, ref) => {
    const store = useStore();
    const [form] = Form.useForm();
    useImperativeHandle(ref, () => ({
      form,
    }));

    useMount(() => {
      if (_.isEqual(store.modalPayload?.type, ActionType.EDIT)) {
        form.setFieldsValue(store.modalPayload?.data || {});
      }
    });

    return (
      <Form form={form}>
        <Form.Item label="基金代码" name="code">
          <Input />
        </Form.Item>
        <Form.Item label="基金名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="基金类型" name="type">
          <Select style={{ width: '100%' }} options={FundTypeList} />
        </Form.Item>
      </Form>
    );
  }),
);

const FundModal = observer(() => {
  const store = useStore();
  const formRef = useRef<{ form: FormInstance }>(null);

  const fetcher = useRequest(
    _.isEqual(store.modalPayload?.type, ActionType.EDIT) ? param => Promise.resolve({}) : param => Promise.resolve({}),
    {
      manual: true,
      onSuccess: () => {
        onClose?.();
        store.listFetcher?.refresh();
      },
    },
  );

  const onClose = useMemoizedFn(() => {
    store.setModalPayload();
  });

  const onOK = useMemoizedFn(async () => {
    const formRes = await formRef?.current?.form?.validateFields?.();

    fetcher?.run({
      ...formRes,
      _id: store.modalPayload?.data?._id,
    });
  });

  return (
    <Modal
      destroyOnClose
      title={store.modalPayload?.type}
      open={!_.isNil(store.modalPayload)}
      onCancel={onClose}
      onOk={onOK}
    >
      <Content ref={formRef} />
    </Modal>
  );
});
FundModal.displayName = 'FundModal';

export default FundModal;
