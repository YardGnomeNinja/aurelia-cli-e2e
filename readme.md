Based on: https://gist.github.com/RossJHagan/707516e503db220ac8d2a61b40344117

# Tested with Aurelia CLI v0.26.1 on Windows 10

1. Execute `npm i -D del gulp-protractor`

1. Add this repository's files to the root of your project

1. Add the following to `<project root>/aurelia_project/aurelia.json`

```json
"e2eTestRunner": {
    "id": "protractor",
    "displayName": "Protractor",
    "source": "test/e2e/src/**/*.ts",
    "dist": "test/e2e/dist/",
    "typingsSource": [
        "typings/**/*.d.ts",
        "custom_typings/**/*.d.ts"
    ],
    "waitToRunTests": 5000
},
```

4. Execute `au e2e` to launch site and run tests located in `<project root>/test/e2e/src/`

# Notes:
* `"waitToRunTests"` defaults to 5 seconds between running `au run` and running the tests. You may need to adjust this value depending on how long it takes for `au run` to launch your site
* Non-Windows users: This has only been tested in a Windows environment. You may need to fix the `killProcess` function in `e2e.ts` to properly kill the child processes that are spawned for hosting the site