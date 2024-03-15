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

        let intArray = [];

        // Generate a 5x5 grid for the bingo card

        for (let i = 0; i < 25; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // Randomly select a prompt from the prompts array
            
            let randomIndex = Math.floor(Math.random() * prompts.length);
            console.log(randomIndex);

            while(isInArray(randomIndex, intArray) || (intArray.length >= 25)){
                randomIndex = Math.floor(Math.random() * prompts.length);
            }

            intArray.push(randomIndex);
            console.log(intArray);

            cell.textContent = prompts[randomIndex];
            bingoCard.appendChild(cell);
        }
    }
    
    function isInArray(elementIn, arrayIn){
        
        for(let i = 0; i < arrayIn.length; i++){
            if(arrayIn[i] == elementIn){
                return true;
            }
        }

        return false;

    }

    function parseCsv(csvData) {
        const lines = csvData.split('\n');
        const prompts = [];
        lines.forEach(line => {
            const fields = line.split(',');
            prompts.push(fields[0]); // Assuming the prompt is in the first column
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