// Function to generate an AES encryption key (only once, for encryption and decryption)
async function generateEncryptionKey() {
    const keyMaterial = await crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256,
        },
        true,
        ['encrypt', 'decrypt']
    );
    return keyMaterial;
}

// Function to encrypt the token using AES-GCM
async function encryptToken(token, key) {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Random initialization vector

    const encryptedToken = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encoder.encode(token)
    );

    return { encryptedToken, iv };  // Return encrypted token and IV
}

// Function to store encrypted token in localStorage
async function storeTokenInLocalStorage(encryptedToken, iv) {
    localStorage.setItem('lcs', JSON.stringify({
        encryptedToken: Array.from(new Uint8Array(encryptedToken)),
        iv: Array.from(iv),
    }));
    document.getElementById("successMessage").style.visibility = "visible";  // Show success message
}

// Function to handle fetch and processing of the nomixp.txt file
async function encryptAndStoreToken() {
    const loadingMessage = document.getElementById("loadingMessage");
    const tokenError = document.getElementById("tokenError");

    loadingMessage.style.visibility = "visible";  // Show loading message
    tokenError.style.visibility = "hidden"; // Hide any previous error messages

    try {
        const response = await fetch('nomixp.txt');
        if (!response.ok) {
            throw new Error('Failed to load nomixp.txt');
        }

        const token = await response.text();  // Get the token from the file
        const key = await generateEncryptionKey();  // Generate encryption key
        const { encryptedToken, iv } = await encryptToken(token, key);  // Encrypt the token
        storeTokenInLocalStorage(encryptedToken, iv);  // Store encrypted token in localStorage
    } catch (error) {
        tokenError.style.visibility = "visible";  // Show error message
    } finally {
        loadingMessage.style.visibility = "hidden"; // Hide loading message
    }
}
