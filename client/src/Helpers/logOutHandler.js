const logOutHandler = () => {

    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userID")
    window.location.reload(false)    
}

export default logOutHandler