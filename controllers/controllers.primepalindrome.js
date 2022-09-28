
const checkIfPalindrome = async (minNumber,maxNumber)=>{
       console.log("Starting palindrome ")

        const palindromesArray = []
       // check if number is negative or modulus is zero ie number ends with zero

        for(let number=minNumber; number<= maxNumber; number++) {

            if (number > 0 && number < 10) {
                palindromesArray.push(number)
                continue
            }

            if (number % 10 === 0){
                continue
            }
            let halfOne = number
            let halfTwo = 0
            while (halfOne > halfTwo) {
                halfTwo = halfTwo * 10 + halfOne % 10 // need to use the current value of halfOne before it is changed
                halfOne = Math.floor(halfOne / 10)
            }
            if (halfOne === halfTwo || halfOne === Math.floor(halfTwo / 10)) {
                palindromesArray.push(number)
            }
        }
        return palindromesArray
}


const checkIfPrime = async (maxNumber ,minNum) => {
    // implements the sieve of Eratosthenes algorithm

    const primeArrays = [] // will hold all the prime nums
    const arrayValues = new Array(maxNumber + 1); // initialize arr

    arrayValues.fill(true); // fill array with true values
    arrayValues[0] = arrayValues[1] = false; // 0 and 1 are not primes by default, we start at 2

    const sqrtStopValue = Math.sqrt(maxNumber)
    for (let i = 2; i <= sqrtStopValue; i++) {
        for (let j = 2; i * j <= maxNumber; j++){
            arrayValues[i * j] = false; // eliminate non primes
        }
    }

    for(let i = minNum; i<= maxNumber; i++) !arrayValues[i] && primeArrays.push(i*2+1);

    return primeArrays;
};


// @desc compute palindrome and/or prime
// @method POST
// @route api/palindromePrime
// @access public
export const computePalindromePrime = async(req, res) => {
    try{
        const startTime =performance.now()

        const { minNumber, maxNumber, feature } = req.body
        let data = []
        let primeArray = []
        let palindromeArray = []
        const palindrome_feature = feature.includes('palindrome')
        const prime_feature =feature.includes('prime')

        if (palindrome_feature){
             palindromeArray = await  checkIfPalindrome(minNumber,maxNumber)
             data = [...palindromeArray]
        }

        if (prime_feature){
             primeArray = await checkIfPrime(maxNumber , minNumber)
             data = [...primeArray]
        }

        if (palindrome_feature && prime_feature){
            // merge both arrays
            const both_palindrome_prime = primeArray.filter(function(val) {
                return palindromeArray.indexOf(val) !== -1;
            });
            data = [...both_palindrome_prime]
        }

        const endTime =performance.now()
        const timeOfExecution = endTime - startTime

        res.json({
            data,
           timeOfExecution
          })


    }catch (e) {

        res.status(503).send({
            message: `Something went wrong while trying to create computePalindromePrime. Contact admin  ${e}`
            ,error:e.message

        })
    }

}
