import { authEvents } from '../../shared/model/auth';
import { Formik } from 'formik';
import { LoginForm } from '../../features/LoginForm';
import { LoginPageStyled } from './styles';

export const LoginPage = () => {
    return (
        <LoginPageStyled>
            <Formik initialValues={{ login: '', password: '' }} onSubmit={authEvents.loginFn}>
                <LoginForm />
            </Formik>
        </LoginPageStyled>
    );
};
