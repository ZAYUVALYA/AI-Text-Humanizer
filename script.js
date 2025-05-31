        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Character counter for input
        const inputText = document.getElementById('ai-input');
        const charCount = document.getElementById('char-count');
        
        inputText.addEventListener('input', () => {
            const count = inputText.value.length;
            charCount.textContent = `${count}/5000 characters`;
            
            if (count > 5000) {
                charCount.classList.add('error');
            } else {
                charCount.classList.remove('error');
            }
        });
        
        // Humanize button functionality
        const humanizeBtn = document.getElementById('humanize-btn');
        const outputText = document.getElementById('human-output');
        const spinner = document.getElementById('spinner');
        const copyBtn = document.getElementById('copy-btn');
        const notification = document.getElementById('notification');
        
        humanizeBtn.addEventListener('click', async () => {
            const text = inputText.value.trim();
            
            if (!text) {
                showNotification('Please enter some text to humanize', 'error');
                return;
            }
            
            if (text.length > 5000) {
                showNotification('Text exceeds 5000 character limit', 'error');
                return;
            }
            
            try {
                // Show loading spinner
                humanizeBtn.disabled = true;
                spinner.style.display = 'block';
                humanizeBtn.querySelector('span').textContent = 'Processing...';
                
                // Create the prompt
                const prompt = `Revise the following text to sound more human and natural, minimizing patterns typically associated with AI-generated writing. Use a mix of short and long sentences, and vary sentence structures to avoid mechanical rhythm. Eliminate repetitive phrases or overused expressions, ensuring lexical diversity across the entire text. Avoid overly formal or technical language unless contextually required, and reduce excessive passive voice constructions. Keep paragraph lengths varied and coherent. Break down noun-heavy phrases and reduce nominalization where possible. Alternate discourse markers and transition signals naturally. Maintain semantic clarity while allowing occasional conversational tone to make the writing feel authentic. Here's the text: \`${text}\`
`;
                
                // Encode the prompt for URL
                const encodedPrompt = encodeURIComponent(prompt);
                
                // Make API request
                const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}`);
                const result = await response.text();
                
                // Display the result
                outputText.value = result;
                
                // Hide spinner
                spinner.style.display = 'none';
                humanizeBtn.querySelector('span').textContent = 'Humanize Text';
                humanizeBtn.disabled = false;
                
            } catch (error) {
                console.error('Error:', error);
                outputText.value = 'Error: Could not humanize the text. Please try again.';
                
                // Hide spinner
                spinner.style.display = 'none';
                humanizeBtn.querySelector('span').textContent = 'Humanize Text';
                humanizeBtn.disabled = false;
                
                showNotification('Error processing your request', 'error');
            }
        });
        
        // Copy button functionality
        copyBtn.addEventListener('click', () => {
            if (outputText.value.trim()) {
                outputText.select();
                document.execCommand('copy');
                showNotification('Text copied to clipboard!', 'success');
            } else {
                showNotification('No text to copy', 'error');
            }
        });
        
        // Notification function
        function showNotification(message, type = 'success') {
            const notif = document.getElementById('notification');
            const icon = notif.querySelector('i');
            const text = notif.querySelector('span');
            
            text.textContent = message;
            
            // Set icon and background based on type
            if (type === 'success') {
                icon.className = 'fas fa-check-circle';
                notif.style.background = '#4cc9f0';
            } else {
                icon.className = 'fas fa-exclamation-circle';
                notif.style.background = '#e63946';
            }
            
            // Show notification
            notif.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                notif.classList.remove('show');
            }, 3000);
        }
        
        // Initialize ScrollReveal animations
        ScrollReveal().reveal('.card', {
            delay: 200,
            distance: '20px',
            origin: 'bottom',
            interval: 100
        });
        
        ScrollReveal().reveal('.feature-card', {
            delay: 300,
            distance: '20px',
            origin: 'bottom',
            interval: 100
        });