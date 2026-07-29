export const Response = async ( res, status, success, message = "Something Went Wrong", data = null ) => {
    return res.status(status).json({
        message,
        success,
        data
    })
}