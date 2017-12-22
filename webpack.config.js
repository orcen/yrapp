const path = require('path');

module.exports = {
    // This is the "main" file which should include all other modules
    entry: './src/app.js',
    // Where should the compiled file go?
    output: {
        // To the `dist` folder
        path: __dirname + '/dist',
        // With the filename `build.js` so it's dist/build.js
        filename: 'app.js'
    },
    module: {
        // Rules are the new Loaders
        rules : [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    css: 'css-loader',
                    scss: 'css-loader|sass-loader',
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
               test: /\.(png|jpg|gif|svg)$/,
               loader: 'file-loader',
               options: {
                   name: 'assets/images/[name].[ext]?[hash]'
               }
            },
            {
                test : /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            'assets-images': path.resolve( __dirname, './src/assets/images' ),
        }
    }
}