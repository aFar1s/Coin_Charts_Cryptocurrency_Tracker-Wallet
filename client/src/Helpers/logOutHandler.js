const logOutHandler = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userID")
}

export default logOutHandler