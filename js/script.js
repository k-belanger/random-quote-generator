var quoteHTML = "";
var usedNums = [];
var colors = ["#e60303", "#ffa337", "#36b55c", "#3636ed", "#8d01ce"];
var usedColors = [];
var interval;


// Change Background Color
function changeBkgdColor() {
    do {
       // get a random number between 0 and the length of the colors array
        var randomColor = Math.floor(Math.random() * colors.length);
        // if number of used colors is equal to the number of colors in the array, clear the array to start over
        if (usedColors.length >= colors.length) {
            usedColors = [];
        // else check to see if random color exits in the used color array
        } else {
            // if the random color does NOT exists in the array of used colors, push randomColor to the array and leave the loop
            if (usedColors.indexOf(randomColor) < 0 ) {
                usedColors.push(randomColor);
                break;
            }
        } 
    } while (true)

     // assign background color to body
    document.body.style.backgroundColor = colors[randomColor];
    // assign color to button
    document.getElementById("loadQuote").style.backgroundColor = colors[randomColor]; 
}


// Get a Random Quote From the Quotes Array
function getRandomQuote() {
    var randomNum;

    // generate random number until you get one that has not been used yet
    do {
        // get a random number between 0 (first array element) and the number of the last array element
        randomNum = Math.floor(Math.random() * quotes.length);
        // if number of used numbers is equal to the number of quotes, clear the array to start over
        if (usedNums.length >= quotes.length) {
            console.log("*************** All quotes used. Starting over. ***************");
            usedNums = [];
        // else check to see if random number exits in the used array
        } else {
            // if the random number does NOT exists in the array of used numbers, push the randomNum to the array and leave the loop
            if (usedNums.indexOf(randomNum) < 0 ) {
                usedNums.push(randomNum);
                break;
            }
        } 
    } while (true)

    // get the randomly selected quote
    var quote = quotes[randomNum];

    // return the quote object
    return quote;
}


// Print the Quote to the Page
function printQuote() {
    // call the changeBdgdColor function
    changeBkgdColor();
    
    // call the getRandomQuote function and store the returned quote object in a variable
    var randomQuote = getRandomQuote();

    // construct a string containing the different properties of the quote object
    quoteHTML = '<p class="quote">' + randomQuote.quote + '</p>';
    quoteHTML += '<p class="source">' + randomQuote.source;
    // only show the citation if it exists
    if (randomQuote.citation) {
        quoteHTML += '<span class="citation">' +  randomQuote.citation + '</span>';
    }
    // only show the year if it exists
    if (randomQuote.year) {
        quoteHTML += '<span class="year">' +  randomQuote.year + '</span>';
    }
    quoteHTML += '</p>';
    
    // add quoteHTML to page
    document.getElementById('quote-box').innerHTML = quoteHTML;

    // log the quote to the console so you can see it doesn't repeat until all quotes have been used
    console.log(randomQuote.quote);
}


// Load first quote to the page when page loads
printQuote();


// Automatically Change the Quote Every 20 Seconds
interval = window.setInterval(printQuote, 20000);


// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", function() {
    printQuote();
    clearInterval(interval); // clears interval every time user clicks button
    interval = window.setInterval(printQuote, 20000); // resets interval timer every time uses clicks button
});