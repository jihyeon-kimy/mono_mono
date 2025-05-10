import {Button} from '.'
import type {ButtonProps} from '.'

const meta = {
    title: 'base/Button',
    component: Button,
    argTypes: {
        size: {
            control: {type: 'select', options: ['sm', 'md', 'lg']},
        },
        full: {
            control: {type: 'boolean', default: false},
        },
        disabled: {
            control: {type: 'boolean', default: false},
        },
    },
}

export default meta

export const 버튼 = ({size, full, disabled}: ButtonProps) => {
    return (
        <div>
            <Button size={size} full={full} disabled={disabled}>
                버튼
            </Button>
        </div>
    )
}
