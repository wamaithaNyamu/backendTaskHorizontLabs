
const checkIfPalindrome = async (minNumber,maxNumber)=>{
       console.log("Starting palindrome ")

        const palindromesArray = []
       // check if number is negative or modulus is zero ie number ends with zero

        for(let number=minNumber; number<= maxNumber; number++) {
            if (number > 0 && number < 10) {
                palindromesArray.push(number)
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


const checkIfPrime = async (minNumber,maxNumber) => {
    console.log("Starting prime ")

    let  primesArray = []
    if (maxNumber < 2) {
        return primesArray
    }

   if(minNumber < 3){
       primesArray =[2]
       minNumber = 3
   }

    for (let number = minNumber; number <= maxNumber; number += 2) {
        let isPrime = true
        const squareRootStop = number ** 0.5
        for (let num in primesArray) {

            if (num > squareRootStop) {
                continue
            }
            if (number % num === 0) {
                isPrime = false
            }
            if (isPrime) {
                primesArray.push(number)
            }
        }
    }

        return primesArray

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
        const startTime =performance.now()
        const palindromeArray = await  checkIfPalindrome(minNumber,maxNumber)
        const primeArray = await  checkIfPrime(minNumber,maxNumber)

        const data = [{
            palindromeArray,
            primeArray
        } ]
        const endTime =performance.now()
        const timeOfExecution = endTime - startTime


        console.log("Call to doSomething took " + timeOfExecution + " milliseconds.")

        res.json({
            data, timeOfExecution
        })
    }catch (e) {
        console.error(`Error while trying to check computePalindromePrime {e}`)

        res.status(503).send({
            message: `Something went wrong while trying to create computePalindromePrime. Contact admin  ${e}`
            ,error:e.message

        })
    }

}
