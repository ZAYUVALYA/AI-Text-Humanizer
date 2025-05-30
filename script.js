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
                const prompt = `You are an AI humanization specialist. Rewrite the provided AI-generated text to sound authentically human-written. The text you'll transform is: \`${text}\`. 

Adopt a conversational tone using concise language and avoid complex jargon. Prioritize short, punchy sentences to enhance engagement. Maintain a 7th-grade readability level with universally understandable vocabulary. Strategically incorporate rhetorical fragments to improve flow and digestibility. When listing concepts, utilize bullet points for clarity. Enrich explanations with relatable analogies or concrete examples. Break apart lengthy sentences into shorter, impactful phrases. Inject personal anecdotes to add authenticity and relatability. Apply the same writing format as the original text. The main task here is just to humanize it. Avoid using any specific formatting like markdown, HTML, or code blocks if the source / original text doesn't have it!.

Exclude all emojis and hashtags entirely. Avoid hyperbolic promotional language like "game-changing," "unlock," "master," "skyrocket," or "revolutionize." Your primary objective is to produce natural, engaging content indistinguishable from human-authored writing while preserving all core information from the original text.`;
                
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