export const Response = async ({ res, status, success, message = "Something Went Wrong", user = null }) => {
    return res.status(status).json({
        message,
        success,
        user
    })
}