
const form = document.getElementById('addForm');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prévenir le rechargement de la page
    
    // Récupérer les valeurs des inputs
    const taskNameInput = document.getElementById('name');
    const taskDescriptionInput = document.getElementById('description');
    const taskDateInput = document.getElementById('date');
    
    const name = taskNameInput.value;
    const description = taskDescriptionInput.value;
    const date = taskDateInput.value;
    
    // Créer un objet task
    const newTask = {
        id: Math.floor(Math.random() * 1000), // Générer un id aléatoire
        title: name,
        description: description,
        date: date
    };
    
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Afficher les données dans la console
        
        // Créer une carte pour une nouvelle tâche
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card'); 
        
        // Créer l'élément nom de la tâche
        const taskNameElement = document.createElement('h3');
        taskNameElement.textContent = name;
        taskCard.appendChild(taskNameElement);
        
        // Créer l'élément description de la tâche
        const taskDescriptionElement = document.createElement('p');
        taskDescriptionElement.textContent = description;
        taskCard.appendChild(taskDescriptionElement);
        
        // Créer l'élément date de la tâche
        const taskDateElement = document.createElement('p');
        taskDateElement.textContent = `Date limite: ${date}`;
        taskCard.appendChild(taskDateElement);
        
        // Créer le bouton supprimer
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
       
        deleteButton.addEventListener('click', function() {
            // Supprimer la tâche via l'API
            fetch(`https://jsonplaceholder.typicode.com/todos/${data.id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Supprimer la tâche de la liste
                    taskCard.remove();
                } else {
                    console.log('La suppression de la tâche a échoué');
                }
            })
            .catch(error => {
                console.log('Une erreur est survenue lors de la suppression de la tâche:', error);
            });
        });
        taskCard.appendChild(deleteButton);
        
        const taskList = document.getElementById('taskList');
        taskList.appendChild(taskCard);
    })
    .catch(error => {
        console.log('Une erreur est survenue:', error);
    })

     // Réinitialisation des inputs
     taskNameInput.value = '';
     taskDescriptionInput.value = '';
     taskDateInput.value = '';
});

    



    
    
   




