const path = require('path');   // node 설치시 제공된다.
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// process.env.NODE_ENV = 'production'; // 배포시 이렇게 프로덕션모드를 사용

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'], // 생략가능
    },

    // 여기부터 중요
    entry: {
        app: ['./client',], // 이것들을 합쳐서 아래 app.js 로 만들어준다. 'WordRelay.jsx' 는 다른데에서 불러왔기때문에 여기에서 추가할 필요가 없다.
    }, // 입력
    module: {
        rules: [{
            test: /\.jsx?/, // js, jsx 룰을 적용한다. (정규표현식으로 js, jsx 타겟)
            loader: 'babel-loader', // 그룰은 바벨로더 룰
            options: {
                presets: [
                    [
                        '@babel/preset-env', 
                        {
                            targets: {
                                browsers: ['> 5% in KR', 'last 2 chrome versions'], // 상위 5% 점유율을 가진 브라우져 지원, 마지막 2버젼의 크롬지원.
                            },
                            debug: true,
                        }
                    ], 
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',  // 핫로딩관련
                ],
            }
        }]
    },    // entry 파일을 읽어서 modules을 적용하고 output으로 결과물을 뺀다.
    plugins: [
        new RefreshWebpackPlugin()
    ],    // 확장프로그램
    output: {
        path: path.join(__dirname, 'dist'), //  __dirname == 현재폴더. 안의 dist.
        filename: 'app.js',
        publicPath: '/dist/',
    }, // 출력
    devServer: {
        publicPath: '/dist/',   // 메모리로 이경로에 저장해둠
        hot: true,
    },
}