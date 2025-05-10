import classNames from 'classnames/bind'
import styles from './button.module.scss'
import React from 'react'

const cx = classNames.bind(styles)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    full?: boolean
}

export function Button({children, size = 'md', full = false, ...restProps}: ButtonProps) {
    return (
        <button
            className={cx('button', {
                [`${size}`]: true,
                full,
            })}
            {...restProps}
        >
            {children}
        </button>
    )
}
