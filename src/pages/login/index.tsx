import React from 'react';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import type { FormInstance } from 'antd';
import { Form, Input, Button, Flex } from 'antd';
import { useRequest } from 'ahooks';

const LoginForm = forwardRef((props, ref) => {
    const [form] = Form.useForm();
    useImperativeHandle(ref, (): { form: FormInstance } => {
        return {
            form,
        };
    });

    return (
        <Form form={form} layout="horizontal">
            <Form.Item name="phone" label="账户名">
                <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item name="password" label="密码">
                <Input.Password placeholder="请输入手机号" />
            </Form.Item>
        </Form>
    );
});

const Login: React.FC = () => {
    const LoginRef = useRef<{ form: FormInstance } | null>(null);
    const fetcher = useRequest(
        params =>
            Promise.resolve({
                code: 200,
                msg: '成功',
            }),
        {
            manual: true,
        },
    );

    const onOK = async () => {
        //const form =await LoginRef.current?.form?.validateFields?.()
    };

    return (
        <>
            <LoginForm ref={LoginRef}></LoginForm>
            <Flex>
                <Button type="primary" onClick={onOK} loading={fetcher.loading}>
                    确认
                </Button>
                <Button type="primary">取消</Button>
            </Flex>
        </>
    );
};

Login.displayName = 'Login';

export default Login;
