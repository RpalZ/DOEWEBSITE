

function initCookieObj(str) {
    return str?.split(';').reduce((acc, cur) => {
        const pairValues = cur.split('=')
        const firstValue = pairValues[0].trim()
        const secondValue = pairValues[1].split('.')[0].split('s%3A').slice(-1)[0]
        // console.log(secondValue)
        acc[firstValue] = secondValue
        return acc
    }, {})

}

module.exports = {
    initCookieObj
}
