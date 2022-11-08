export default function authHeader() {
    console.log("#### authHeader: ");
    const userStr = localStorage.getItem("user");
    console.log("#### userStr: "+ userStr);
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);
        
    if (user && user.accessToken) {
        // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
        return user.accessToken;
    } else {
        // return { Authorization: '' }; // for Spring Boot back-end
        return { 'Authorization': null }; // for Node Express back-end
    }
}