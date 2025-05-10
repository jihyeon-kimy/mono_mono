import {colors} from '.'

import {Grid} from '../Grid'

const meta = {
    title: 'base/colors',
    component: Text,
}

export default meta

const colorKeys = Object.keys(colors) as (keyof typeof colors)[]

export const 색상 = () => {
    return (
        <Grid columns={4} gap="md">
            {colorKeys.map((color) => (
                <Grid justify="center" key={color}>
                    <div
                        className={`color-${color}`}
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: colors[color],
                            borderRadius: '4px',
                        }}
                    />
                    <span style={{marginTop: '8px', fontSize: '14px', textAlign: 'center'}}>
                        {color}: <span style={{fontWeight: 'bold'}}>{colors[color]}</span>
                    </span>
                </Grid>
            ))}
        </Grid>
    )
}
