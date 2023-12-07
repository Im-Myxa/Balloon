const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development",
    isProd = !isDev;

const filename = (exp) => (isDev ? `[name].${exp}` : `[name].[hash].${exp}`)

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if(isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
    return config;
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: '/js/index.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        // assetModuleFilename: 'images/[name][ext]'
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.png', '.svg', 'sass']
    },
    devServer: {
        port:1111,
        hot:isDev
    },
    optimization: optimization(),
    // devtool: isDev ?? 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: '/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new CleanWebpackPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //       { from: path.resolve(__dirname, './src/assets'), to: path.resolve(__dirname, 'dist/img') },
        //     ],
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /.sass$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                  // Disables attributes processing
                  sources: true ,
                },
            },
            {
                //правило для работы с image
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            // {
            //     test: /\.mp4$/,
            //     use: 'file-loader?name=videos/[name].[ext]',
            // },
            {
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env']
                    ]
                  }
                }
            }
        ],
      },

}