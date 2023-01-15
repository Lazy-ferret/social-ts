import React from 'react'
// @ts-ignore
import styles from './../FormsControl/FormsControl.module.css'

type FormControlPropsType = {
    meta: {
        touched: boolean
        error: any
    }
    children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({ meta, children }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

type FormElementPropsType = {
    input: any
    meta: {
        touched: boolean
        error: any
        submitError: any
    }
    restProps: any
}

export const Textarea: React.FC<FormElementPropsType> = (props) => {
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}>
            <textarea  {...input} {...restProps} />
        </FormControl>
    )
}

export const Input: React.FC<FormElementPropsType> = (props) => {
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}>
            <input  {...input} {...restProps} />
            {meta.submitError && <span>{meta.submitError}</span>}
        </FormControl>
    )
}
