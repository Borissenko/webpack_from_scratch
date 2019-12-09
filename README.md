https://tocode.ru/curses/nastroika-webpack4


## Build Setup:

``` bash
# Download repository:
git clone https://github.com/vedees/webpack-template webpack-template

# Go to the app:
cd webpack-template

# Install dependencies:
npm install

# Server with hot reload at http://localhost:8081/
npm run dev

# Output will be at dist/ folder
npm run build
```

## Project Structure:

* `src/index.html` - main app HTML
* `src/scss` - put custom app SCSS styles here. Don't forget to import them in `main.js`
* `src/css` - the same as above but CSS here. Don't forget to import them in `main.js`
* `src/img` - put images here. Don't forget to use correct path: `assets/img/some.jpg`
* `src/js` - put custom app scripts here
* `src/old_index.js` - main app file where you include/import all required libs and init app
* `src/components` - folder with custom `.vue` components
* `src/store` - app store for vue
* `static/` - folder with extra static assets that will be copied into output folder

## License
[MIT](./LICENSE)

Copyright (c) 2018-present, [Evgenii Vedegis](https://github.com/vedees)
