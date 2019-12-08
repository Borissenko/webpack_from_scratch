

лек 3
npm i webpack-merge --save-dev

Чтобы обработать картинки в Webpack`е
npm install --save-dev file-loader 

копировать наши изображения и статичные файлы из dev в build. 
Чтобы в последующем мы могли к ним обращаться.
npm install copy-webpack-plugin --save-dev 

чтобы избавиться от index.html в корне проекта и перенести его в папку src и в дальнейшем скопировать его в dist.
npm install html-webpack-plugin --save-dev 



лек 4. Подключение Vue.
npm i vue vuex --save
npm i vue-loader vue-style-loader vue-template-compiler --save-dev  //для использования vue-компонентов
npm i vue-style-loader css-loader sass-loader --save  //для использования в компоненте scss

прописываем в плагинах webpack.base.conf.js :
const { VueLoaderPlugin } = require('vue-loader')
plugins: [
new VueLoaderPlugin(),
]

лек 5 Добавляем сплиты
при билде код компонентов и библиотеки для него собираем в разные файлы
-vendors.js
-app.js
А в index.html будет прописано 2 js-файла:
<script type="text/javascript" src="/assets/js/vendors.js"></script>
<script type="text/javascript" src="/assets/js/app.js"></script>

Для того, что бы при изменении кода в проекте у нас пересобирался и перегружался клиенту app.js
нам нужен [hash] в имени app.js, vendors.js и app.css




