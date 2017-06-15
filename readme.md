Based on: https://gist.github.com/RossJHagan/707516e503db220ac8d2a61b40344117

#Tested with Aurelia CLI v0.26.1

1. Execute `npm i -D del gulp-protractor`

1. Add these files to the root of your project

1. Add the following to `./aurelia_project/aurelia.json`

```json
"e2eTestRunner": {
    "id": "protractor",
    "displayName": "Protractor",
    "source": "test/e2e/src/**/*.ts",
    "dist": "test/e2e/dist/",
    "typingsSource": [
        "typings/**/*.d.ts",
        "custom_typings/**/*.d.ts"
    ]
},
```

4. Execute `au e2e` to run tests in `./test/e2e/src/`