

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
A)
при билде код компонентов и библиотеки для него собираем в разные файлы
-vendors.js
-app.js
А в index.html будет прописано 2 js-файла:
<script type="text/javascript" src="/assets/js/vendors.js"></script>
<script type="text/javascript" src="/assets/js/app.js"></script>

Для того, что бы при изменении кода в проекте у нас пересобирался и перегружался клиенту app.js
нам нужен [hash] в имени app.js, vendors.js и app.css

B)
Можно разграничить тем же способом и код самого проекта
-частоизменяющиеся компоненты
-редко используемые
Для этого создаем несколько точек входа.
Они будут билдеться в разные js-файлы и прописываться в index.html по-отдельности

C)
если поставить inject:false у HtmlWebpackPlugin в webpack.base.conf.js, то при билде у index.html в <head> не будет добавляться <linc> с хрефом на css-файл,
<linc> надо будет прописывать вручную в материнском index.html. Но хэша у css-файла, прописанного в хрефе, не будет.
Что бы линк прописывался с самообновляемым хэшем, делаем как указано в https://github.com/jaketrent/html-webpack-template,
В <head> материнского index.html добавляем ....облом.
см. https://webpack.js.org/plugins/html-webpack-plugin/




