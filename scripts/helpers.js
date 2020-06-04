function ifEqual(left, right, options){
    if (left == right){
        return options.fn(this)
    }else{
        return options.inverse(this)
    }
}

function encodeURIHelper(value,options){
    return encodeURI(value)
}

module.exports = {
    ifEqual: ifEqual,
    encodeURI: encodeURIHelper
}