export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404).send({
        "message":`Resource not found ${error}. Make sure you are sending the request type. GET,POST,PUT or DELETE`
    })

    console.log(error)
    next(error)
}
