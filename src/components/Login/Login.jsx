import React from 'react'
import { Field, Form } from 'react-final-form'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { requiredField } from '../../utils/validators/validators'
import { Input } from '../common/FormsControl/FormsControl'
import { login } from './../../redux/authReducer'
import style from './Login.module.css'


const LoginForm = (props) => {
    const { onSubmit, error, captchaUrl } = props

    return (
        <Form
            initialValues={{
                email: '',
                password: '',
                rememberMe: false, 
                captcha: null
            }}
            onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>

                    <div>
                        <Field
                            component={Input}
                            name={'email'}
                            validate={requiredField}
                            placeholder={'Email'} />
                    </div>
                    <div>
                        <Field component={Input}
                            name={'password'}
                            type={'password'}
                            validate={requiredField}
                            placeholder={'Password'} />
                    </div>
                    <div>
                        <Field component={Input} name={'rememberMe'} type={'checkbox'} /> remember me
                    </div>
                    {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
                    {captchaUrl && <Field component={Input}
                            name={'captcha'}
                            validate={requiredField}
                            placeholder={'captcha'} />}

                    {error && <div className={style.formError}>{error}</div>}
                    <div>
                        <button>Login</button>
                    </div>
                </form>
            )}
        </Form>
    )
}

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to='/profile' />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit} error={props.error} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login)