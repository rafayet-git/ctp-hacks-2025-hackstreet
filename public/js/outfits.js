document.addEventListener('DOMContentLoaded', function() {
    displaySavedOutfits();
});

function saveOutfit(button) {
    const outfitId = parseInt(button.dataset.id);
    
    let savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || []; 
    const isAlreadySaved = savedOutfits.includes(outfitId);
    
    if (!isAlreadySaved) {
        savedOutfits.push(outfitId);
        localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
        
        // Update button state
        button.textContent = 'Saved!';
        button.disabled = true;
        button.classList.add('saved');

        displaySavedOutfits();
    } 
}

function removeOutfit(outfitId) {
    let savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || [];
    
    savedOutfits = savedOutfits.filter(id => id !== outfitId);
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));

    displaySavedOutfits();
    
    // Re-enable save button for this article
    const saveButton = document.querySelector(`button[data-id="${outfitId}"]`);
    if (saveButton) {
        saveButton.textContent = 'Save';
        saveButton.disabled = false;
        saveButton.classList.remove('saved');
    }
}

function displaySavedOutfits() {
    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || [];
    const savedTable = document.getElementById('saved-outfits-table');
    const savedTableBody = document.getElementById('saved-outfits-body');
        
    if (savedOutfits.length === 0) {
        savedTable.style.display = 'none';
    } else {
        savedTable.style.display = 'table';
        
        [...savedTableBody.children].forEach(child => child.remove());

        // Fetch article details for each saved ID and display them
        fetchSavedOutfitDetails(savedOutfits);
    }
    
    updateSaveButtonStates();
}

// Function to fetch outfit details from DB
async function fetchSavedOutfitDetails(outfitIds) {
    const savedTableBody = document.getElementById('saved-outfits-body');
        
    try {
        const validIds = outfitIds.filter(id => !isNaN(id) && id !== null);
        
        // Fetch details for each outfit ID
        for (const outfitId of validIds) {
            const response = await fetch(`/outfits/api/${outfitId}`);
            if (response.ok) {
                const outfit = await response.json();                
                const row = document.createElement('tr');
                
                const outfitCell = document.createElement('td');
                outfitCell.textContent = outfit.outfit_id;
                
                const articlesCell = document.createElement('td');
                articlesCell.textContent = outfit.articles || 'No articles';
                
                const likesCell = document.createElement('td');
                likesCell.textContent = outfit.likes || 0;
                
                const actionCell = document.createElement('td');
                
                // View Details link
                const viewLink = document.createElement('a');
                viewLink.href = `/outfits/${outfit.outfit_id}`;
                viewLink.textContent = 'Details';
                actionCell.appendChild(viewLink);
                
                // Like link
                const likeLink = document.createElement('a');
                likeLink.href = `/outfits/${outfit.outfit_id}/like`;
                likeLink.textContent = 'Like';
                likeLink.style.marginLeft = '10px';
                actionCell.appendChild(likeLink);
                
                // Remove button
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-btn';
                removeButton.textContent = 'Remove';
                removeButton.style.marginLeft = '10px';
                removeButton.addEventListener('click', () => removeOutfit(outfit.outfit_id));
                actionCell.appendChild(removeButton);
                
                // Append all cells to the row
                row.appendChild(outfitCell);
                row.appendChild(articlesCell);
                row.appendChild(likesCell);
                row.appendChild(actionCell);
                
                savedTableBody.appendChild(row);
            } else {
                console.warn(`Outfit with ID ${outfitId} not found`);
            }
        }
    } catch (error) {
        console.error('Error fetching saved outfit details:', error);
    }
}

// Function to update save button states based on what's already saved
function updateSaveButtonStates() {
    const savedOutfitIds = JSON.parse(localStorage.getItem('savedOutfits')) || [];
    
    document.querySelectorAll('.save-btn').forEach(button => {
        const outfitId = parseInt(button.dataset.id);
        if (savedOutfitIds.includes(outfitId)) {
            button.textContent = 'Saved!';
            button.disabled = true;
            button.classList.add('saved');
        }
    });
}
