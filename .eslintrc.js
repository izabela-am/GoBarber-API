module.exports = {
  env: {
    es2020: true,
    node: true
  },
  extends: [
    'airbnb-base',
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
      "ecmaVersion": 2018,
      "sourceType": "module" 
  },
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    "class-methods-use-this": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "import/no-unresolved": "off",
    "prettier/prettier": "error",
	   	"import/extensions": [
	      "error",
	      "ignorePackages",
	      {
	        "ts": "never"
	      }
	    ],
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
};