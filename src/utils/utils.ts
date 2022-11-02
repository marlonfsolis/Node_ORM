/** Check if the value is a key value pair object. */
export function isKeyValuePair(value:any) {
    return value && typeof value === 'object' && value.constructor === Object;
}
