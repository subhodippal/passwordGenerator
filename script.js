function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const startStr = document.getElementById('start').value || "";

    if (length < startStr.length) {
        alert("Password length must be greater than starting string length.");
        return;
    }

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specials = "$%#@!&*";
    const allChars = upperChars + lowerChars + numbers + specials;

    let password = startStr;

    // Ensure at least one of each required type
    if (!/[A-Z]/.test(password)) password += upperChars[Math.floor(Math.random() * upperChars.length)];
    if (!/[a-z]/.test(password)) password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
    if (!/[0-9]/.test(password)) password += numbers[Math.floor(Math.random() * numbers.length)];
    if (!/[$%#@!&*]/.test(password)) password += specials[Math.floor(Math.random() * specials.length)];

    // Fill remaining characters
    while (password.length < length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle password to avoid predictable patterns
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    // Keep start string at start if provided
    if (startStr) {
        password = startStr + password.slice(startStr.length);
    }

    document.getElementById('result').innerText = password;
    document.getElementById('copyBtn').style.display = "block";
}

function copyPassword() {
    const resultText = document.getElementById('result').innerText;
    navigator.clipboard.writeText(resultText).then(() => {
        alert("Password copied to clipboard!");
    });
}
