
// @desc compute palindrome and/or prime
// @method POST
// @route api/palindromePrime
// @access public
export const computePalindromePrime = async(req, res) => {
    try{

    //   check if palindrome or prime
            console.log(req.body)

        res.json(true)
    }catch (e) {
        console.error(`Error while trying to check computePalindromePrime {e}`)

        res.status(503).send({
            message: `Something went wrong while trying to create Product. Contact admin  ${e}`
            ,error:e.message

        })
    }

}
