
const check_if_palindrome = async (minNumber,maxNumber)=>{

        const palindromes_array = []
       // check if number is negative or modulus is zero ie number ends with zero

        for(let number=minNumber; number<= maxNumber; number++) {

            if (number > 0 && number < 10) {
                palindromes_array.push(number)
                continue
            }

            let half_one = number
            let half_two = 0

            while (half_one > half_two) {
                half_two = half_two * 10 + half_one % 10 // need to use the current value of half_one before it is changed
                half_one = Math.floor(half_one / 10)
            }
            if (half_one === half_two || half_one === Math.floor(half_two / 10)) {
                palindromes_array.push(number)
            }
        }
        return palindromes_array
}


const check_if_prime = async (minNumber,maxNumber) => {

        if(maxNumber < 2 ){
            return []
        }

        const primes_array = [2]

        for(let number=minNumber; number<= maxNumber; number += 2 ) {
            let is_prime = true
            const square_root_stop = number**0.5
            for(let num in primes_array){

                if(num > square_root_stop){
                    continue
                }

                if (number% num === 0){
                    is_prime = false
                }
            }

            if (is_prime){
                primes_array.push(number)
            }

        }

        return  primes_array

    }



// @desc compute palindrome and/or prime
// @method POST
// @route api/palindromePrime
// @access public
export const computePalindromePrime = async(req, res) => {
    try{

    //   check if palindrome or prime
        console.log(req.body)
        const { minNumber, maxNumber, feature} = req.body

        const is_palindrome = await  check_if_palindrome(minNumber,maxNumber)
        const is_prime = await  check_if_prime(minNumber,maxNumber)
        

        // The API should Return:
        //     - data (array) should contain all the numbers that are palindromes or primes or that are
        // palindromes and primes at the same time based on the feature parameter.
        // - timeOfExecution: (float) time of how long it took to get the results

        res.json(true)
    }catch (e) {
        console.error(`Error while trying to check computePalindromePrime {e}`)

        res.status(503).send({
            message: `Something went wrong while trying to create Product. Contact admin  ${e}`
            ,error:e.message

        })
    }

}
