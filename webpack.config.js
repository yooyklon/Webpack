const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const dev = process.env.NODE_ENV === 'development';
const prod = !dev;

const optimization = () => {
 const obj = {}

 if (prod) {
  obj.minimizer = [new TerserPlugin(), new CssMinimizerPlugin()];
 }
 return obj;
}


module.exports = {
 entry: {
  app: './src/js/app.js',
 },
 output: {
  filename: './js/[name].[contenthash].js',
  path: path.resolve(__dirname, 'dist'),
 },
 optimization: optimization(),
 devServer: {
  port: 4200,
  static: './src',
 },
 module: {
  rules: [
   {
    test: /\.css$/i,
    use: [
     MiniCssExtractPlugin.loader,
     'css-loader'
    ]
   }
  ]
 },
 plugins: [
  new HtmlWebpackPlugin({
   template: './src/index.html',
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
   filename: './css/[name].[contenthash].css'
  })
 ]
}