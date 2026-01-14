export const MOBILE_WIDTH = 600;
export const MIN_NAV_LIST_WIDTH = 1000;
export const MAX_TITLE_LENGTH = 150;
var api_url = ""
try {
    api_url = import.meta.env.API_URL
    console.log(api_url)
} catch {
    api_url = process.env.REACT_APP_API_URL;
    console.log(process.env.REACT_APP_API_URL)
}
export const API_URL = api_url;
console.log(process.env.REACT_APP_API_URL)
console.log(process.env.NODE_ENV)