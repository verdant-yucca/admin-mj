import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { FormStyled } from './styles';
import { useFormikContext } from 'formik';

export const LoginForm = () => {
    const { submitForm, handleChange } = useFormikContext();
    return (
        <FormStyled>
            <Input name="login" placeholder="login" onChange={handleChange} />
            <Input.Password
                name="password"
                placeholder="password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={handleChange}
            />
            <Button onClick={submitForm} type="primary">
                Login
            </Button>
        </FormStyled>
    );
};
