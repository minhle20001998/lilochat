const profanity = [
    "loli"
]

const generateProfanityRegex = () => {
    let string = "";
    profanity.forEach((word, index) => {
        if (index === profanity.length - 1) {
            string += `(${word})`
        } else {
            string += `(${word})|`
        }
    })
    return new RegExp(string, 'ig');;
}

export default generateProfanityRegex;