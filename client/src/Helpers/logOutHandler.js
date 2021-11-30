const logOutHandler = () => {

    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userID")
    sessionStorage.removeItem("wallet")
    sessionStorage.removeItem("dashboard")
}

export default logOutHandler