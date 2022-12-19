module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
          "files": [
            "**/*.test.js",
            "**/*.test.jsx"
          ],
          "env": {
            "jest": true
          }
        }
      ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
          "version": "detect"
        }
      },
    "rules": {
        "react/jsx-uses-react": 1,   
     "react/jsx-uses-vars": 1,
     "no-unused-vars": 1,
    }
    
}
