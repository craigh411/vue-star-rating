module.exports =  {
    "moduleFileExtensions": [
        "js",
        // tell Jest to handle `*.vue` files
        "vue"
    ],
    "transform": {
        // process `*.vue` files with `vue-jest`
        ".*\\.(vue)$": "vue-jest",
        ".*\\.(js)$": "babel-jest"
    }
};