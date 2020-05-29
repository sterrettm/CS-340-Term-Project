function ifEqual(left, right, options){
    if (left == right){
        return options.fn(this)
    }else{
        return options.inverse(this)
    }
}

module.exports = {
    ifEqual: ifEqual
}