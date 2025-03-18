
document.getElementById('userId').addEventListener('keypress', function(event) {
    const char = String.fromCharCode(event.keyCode);
    if (!char.match(/[a-zA-Z0-9\s]/)) {  // Allows letters, numbers, and space
        event.preventDefault(); // Block the input
    }
});
