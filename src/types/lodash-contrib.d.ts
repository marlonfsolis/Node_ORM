import _ = require("lodash");
declare module "lodash" {
    interface LoDashStatic {
        /**
         * Checks whether the value is valid JSON.
         * See https://www.json.org/json-en.html for more information on what constitutes valid JSON.
         * NOTE: This function relies on JSON.parse which is not available in IE7 and earlier.
         * */
        isJSON(value:any): boolean;
    }
}
