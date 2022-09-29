
export const checkIfPalindrome = async (minNumber,maxNumber)=>{

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


export const checkIfPrime = async (minNum, maxNumber) => {
    // implements the sieve of Eratosthenes algorithm

    const arrayValues =   Array(maxNumber + 1).fill(true); // initialize arr fill array with true values
    arrayValues[0] = arrayValues[1] = false; // 0 and 1 are not primes by default, we start at 2

    const sqrtStopValue = Math.sqrt(maxNumber)
    for (let i = 2; i <= sqrtStopValue; i++) {
        for (let j = 2; i * j <= maxNumber; j++){
            arrayValues[i * j] = false; // eliminate non primes
        }
    }

   // return primeArrays;
    return arrayValues.reduce((acc, val, ind) => {

            if (val && ind >= minNum) {

                return acc.concat(ind);
            } else {
                return acc;
            };

    },[])
};


// @desc compute palindrome and/or prime
// @method POST
// @route api/palindromePrime
// @access public
export const computePalindromePrime = async(req, res) => {
    try{
        const startTime =performance.now()

        const { minNumber, maxNumber, feature } = req.body

        if(minNumber && maxNumber && feature) {

            // validations on the body

            //both minNumber and maxNumber must be int
            if (!Number.isInteger(minNumber) || !Number.isInteger(maxNumber)) throw Error("minNumber and maxNumber must be  integers")

            // minNumber must be greater than 0
            if (minNumber <= 0) throw Error("The minimum number must be greater than 0")
            if (maxNumber <= 0) throw Error("The maximum number must be greater than 0")


            const palindrome_feature = feature.includes('palindrome')
            const prime_feature = feature.includes('prime')

            // check if features supplied are palindrome or prime
            if (!palindrome_feature && !prime_feature) throw Error("Features can only only contain  ['palindrome'] or ['prime'] or ['palindrome','prime']")

            let data = [] // hold returned data array
            let primeArray = []
            let palindromeArray = []


            if (palindrome_feature) {
                console.log("palll start")
                palindromeArray = await checkIfPalindrome(minNumber, maxNumber)
                data = [...palindromeArray]
                console.log("palll stop")

            }
            if (prime_feature) {
                console.log("prriimm start")
                primeArray = await checkIfPrime(minNumber, maxNumber)
                data = [...primeArray]
                console.log("prriimm stop")
            }

            if (palindrome_feature && prime_feature) {
                // merge both arrays
                const both_palindrome_prime = await primeArray.filter(async function (val) {
                    return await palindromeArray.indexOf(val) !== -1;
                });
                data = [...both_palindrome_prime]
            }
            const endTime = performance.now()
            const timeOfExecution = endTime - startTime

            res.status(200).send({
                data,
                timeOfExecution
            })
        }else{
          throw Error("Invalid body. Accepted keys are minNumber, maxNumber and feature ")

           }
    }catch (e) {

        res.status(503).send({
            error:e.message

        })
    }

}
