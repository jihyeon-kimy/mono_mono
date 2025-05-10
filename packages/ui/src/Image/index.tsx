import classNames from 'classnames/bind'
import styles from './image.module.scss'

const cx = classNames.bind(styles)

export const RATIO_MAP = {
    '4:1': 'mini',
    '5:3': 'small',
    '4:3': 'medinum',
    '1:1': 'large',
    '10:11': 'big',
}

export interface BaseImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string
    size?: keyof typeof RATIO_MAP
}

export function Image({src, size = '1:1', ...props}: BaseImageProps) {
    return (
        <div className={cx('img-container', {[`${RATIO_MAP[size]}`]: true})}>
            <img src={src} loading="lazy" {...props} />
        </div>
    )
}
