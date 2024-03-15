document.addEventListener("DOMContentLoaded", function() {
    const bingoCard = document.getElementById("bingo-card");
    const addPromptButton = document.getElementById("add-prompt-btn");
    const newPromptInput = document.getElementById("new-prompt-input");
    const importCardInput = document.getElementById("import-card-btn");
    const promptsList = document.getElementById("prompts-list");
    const genarateNewCardButton = document.getElementById("genarate-card-btn");
    let prompts = []; // Array to store prompts

    addPromptButton.addEventListener("click", function() {
        const newPrompt = newPromptInput.value.trim();
        if (newPrompt) {
            prompts.push(newPrompt);
            updatePromptsList();
            newPromptInput.value = ''; // Clear the input field
        }
    });

    importCardInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function() {
                const csvData = reader.result;
                prompts = parseCsv(csvData);
                updatePromptsList();
            };
        }
    });

    genarateNewCardButton.addEventListener("click", function(){

        if (prompts.length >= 25) {
            generateBingoCard(prompts);
        } else {
            alert("Please add at least 25 prompts before generating the bingo card.");
        }

    });

    function generateBingoCard(prompts) {
        bingoCard.innerHTML = ''; // Clear previous card
        const intArray = []; // Array to track used indexes

        // Generate a 5x5 grid for the bingo card
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            
            // Randomly select a prompt from the prompts array
            let randomIndex = Math.floor(Math.random() * prompts.length);
            
            // Ensure that the random index is not already in the array
            while (intArray.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * prompts.length);
            }

            // Add the random index to the array
            intArray.push(randomIndex);

            cell.textContent = prompts[randomIndex];
            bingoCard.appendChild(cell);
            
            // Add click event listener to each cell
            cell.addEventListener("click", function() {
                // Toggle class to stamp/unstamp the cell
                cell.classList.toggle("stamped");
            });

            if(i == 12){
                cell.textContent = "Free Space!";
            }

        }
    }
    

    function parseCsv(csvData) {
        const lines = csvData.split('\n'); // Split by newline character to separate rows
        const prompts = [];
        lines.forEach(line => {
            const fields = line.split(','); // Split each line by comma to separate columns
            fields.forEach(field => {
                prompts.push(field.trim()); // Trim whitespace and add each field as a prompt
            });
        });
        return prompts;
    }

    function updatePromptsList() {
        promptsList.innerHTML = '';
        prompts.forEach(prompt => {
            const promptItem = document.createElement("div");
            promptItem.textContent = prompt;
            promptsList.appendChild(promptItem);
        });
    }



});