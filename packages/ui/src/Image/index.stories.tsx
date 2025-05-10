import type {BaseImageProps} from '.'
import {Image, RATIO_MAP} from '.'

const meta = {
    title: 'base/image',
    component: Image,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(RATIO_MAP),
            },
            description: '이미지 비율',
        },
    },
}

export default meta

export const 이미지 = ({size}: BaseImageProps) => {
    return <Image src="https://picsum.photos/1000/1000" size={size} />
}
