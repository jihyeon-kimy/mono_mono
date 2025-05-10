import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import {viteStaticCopy} from 'vite-plugin-static-copy'
import cssInjected from 'vite-plugin-css-injected-by-js'

import fs from 'fs'

import builtins from 'builtin-modules'

const extension = '.mjs'

/**
 * 프로젝트의 package.json 파일에서 정의된 dependencies 및 peerDependencies를 자동으로 추출하고,
 * 해당 의존성들을 번들링에서 제외시킬 수 있도록 처리합니다.
 */
function getExternalDependencies(cwd: string) {
    const packageJSONPath = path.join(cwd, 'package.json')
    const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'))

    // 기본적으로 Node.js 내장 모듈(builtins)을 포함
    let deps: string[] = [...builtins]

    // package.json의 dependencies에서 의존성 추출
    if ('dependencies' in packageJSON && typeof packageJSON.dependencies === 'object') {
        deps = [...deps, ...Object.keys(packageJSON.dependencies)]
    }

    // package.json의 peerDependencies에서 의존성 추출
    if ('peerDependencies' in packageJSON && typeof packageJSON.peerDependencies === 'object') {
        deps = [...deps, ...Object.keys(packageJSON.peerDependencies)]
    }

    // 의존성 목록에 하위 모듈도 포함시키기 위해 정규 표현식으로 추가
    return deps.flatMap((dep) => [dep, new RegExp(`^${dep}/.*`)])
}

/**
 * 파일 경로에서 확장자를 변경하는 함수
 * 예를 들어 `.ts`, `.jsx`, `.scss` 등을 `.mjs` 또는 `.js`로 변환
 */
const replaceExtension = (target: string, replacement: '.mjs' | '.js') => {
    const regex = /\.([tj]s[x]?|scss)$/
    return target.replace(regex, replacement)
}

export default defineConfig({
    plugins: [
        react(),
        // 타입 정의를 엔트리 포인트에 자동 추가
        dts({
            insertTypesEntry: true,
            outDir: 'dist',
        }),
        // 복사한 파일을 dist의 루트 디렉토리에 배치
        viteStaticCopy({
            targets: [
                {
                    src: path.resolve(__dirname, 'src/styles'),
                    dest: '.', // dist/styles 폴더로 복사
                },
            ],
        }),
        cssInjected(),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'), // 빌드할 엔트리 파일
            formats: ['es'], // ESM 형식으로 빌드
            fileName: 'index.mjs', // 출력 파일명
        },
        outDir: 'dist', // 빌드된 파일들은 dist 폴더에 생성
        rollupOptions: {
            // 외부 의존성으로 처리할 라이브러리 목록
            external: getExternalDependencies(process.cwd()),
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
                /**
                 * 엔트리 파일명 설정: src 디렉토리 하위 경로에 따라 파일명을 .mjs로 변경
                 */
                entryFileNames: (chunkInfo) => {
                    const subPath = chunkInfo.facadeModuleId?.split('src')[1]

                    if (subPath) {
                        const relativePath = subPath.startsWith('/') ? subPath.slice(1) : subPath
                        return replaceExtension(relativePath, extension)
                    }

                    return `${chunkInfo.name}${extension}`
                },
                /**
                 * 에셋 파일명 설정: 스타일 파일이나 기타 에셋의 이름을 설정
                 */
                assetFileNames: (assetInfo) => {
                    console.log('assetInfo', assetInfo)
                    if (!assetInfo.names) {
                        return ''
                    }

                    return assetInfo.names[0]
                },
                // 모듈을 개별적으로 유지하여 코드 스플리팅 적용
                preserveModules: true,
            },
        },
    },
})
