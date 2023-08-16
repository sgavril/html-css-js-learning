// Recursion
function isEven(number) {
    if (number == 0) { return true }
    else if (number == 1) { return false }
    else if (number < 0) { return '??' }
    else { return isEven(number-2) }
}

// Bean counting
function countBs(text) {
    num_bs = 0;
    for (i=0; i<text.length; i++) {
        if (text[i] == "B") { num_bs++; }
    }
    return num_bs
}

function countChar(text, char) {
    num_char = 0;
    for (i=0; i<text.length; i++) {
        if (text[i] == char) { num_char++; }
    }
    return num_char
}