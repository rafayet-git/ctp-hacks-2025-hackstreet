document.addEventListener('DOMContentLoaded', function() {
    displaySavedArticles();
});

function saveArticle(button) {
    const articleId = parseInt(button.dataset.id);
    
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || []; 
    const isAlreadySaved = savedArticles.includes(articleId);
    
    if (!isAlreadySaved) {
        savedArticles.push(articleId);
        localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
        
        // Update button state
        button.textContent = 'Saved!';
        button.disabled = true;
        button.classList.add('saved');

        displaySavedArticles();
    } 
}

function removeArticle(articleId) {
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    
    savedArticles = savedArticles.filter(id => id !== articleId);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

    displaySavedArticles();
    
    // Re-enable save button for this article
    const saveButton = document.querySelector(`button[data-id="${articleId}"]`);
    if (saveButton) {
        saveButton.textContent = 'Save';
        saveButton.disabled = false;
        saveButton.classList.remove('saved');
    }
    
}

function displaySavedArticles() {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    const savedTable = document.getElementById('saved-articles-table');
    const savedTableBody = document.getElementById('saved-articles-body');
        
    if (savedArticles.length === 0) {
        savedTable.style.display = 'none';
    } else {
        savedTable.style.display = 'table';
        
        [...savedTableBody.children].forEach(child => child.remove());

        // Fetch article details for each saved ID and display them
        fetchSavedArticleDetails(savedArticles);
    }
    
    updateSaveButtonStates();
}

// Function to fetch article details from DB
async function fetchSavedArticleDetails(articleIds) {
    const savedTableBody = document.getElementById('saved-articles-body');
        
    try {
        const validIds = articleIds.filter(id => !isNaN(id) && id !== null);
        
        // Fetch details for each article ID
        for (const articleId of validIds) {
            const response = await fetch(`/articles/api/${articleId}`);
            if (response.ok) {
                const article = await response.json();                
                const row = document.createElement('tr');
                
                const brandCell = document.createElement('td');
                brandCell.textContent = article.brand;
                
                const categoryCell = document.createElement('td');
                categoryCell.textContent = article.category;
                
                const colorCell = document.createElement('td');
                colorCell.textContent = article.color;
                
                const patternCell = document.createElement('td');
                patternCell.textContent = article.pattern;
                
                const actionCell = document.createElement('td');
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-btn';
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => removeArticle(article.id));
                actionCell.appendChild(removeButton);
                
                // Append all cells to the row
                row.appendChild(brandCell);
                row.appendChild(categoryCell);
                row.appendChild(colorCell);
                row.appendChild(patternCell);
                row.appendChild(actionCell);
                
                savedTableBody.appendChild(row);
            } else {
                console.warn(`Article with ID ${articleId} not found`);
            }
        }
    } catch (error) {
        console.error('Error fetching saved article details:', error);
    }
}

// Function to update save button states based on what's already saved
function updateSaveButtonStates() {
    const savedArticleIds = JSON.parse(localStorage.getItem('savedArticles')) || [];
    
    document.querySelectorAll('.save-btn').forEach(button => {
        const articleId = parseInt(button.dataset.id);
        if (savedArticleIds.includes(articleId)) {
            button.textContent = 'Saved!';
            button.disabled = true;
            button.classList.add('saved');
        }
    });
}