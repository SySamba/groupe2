let apprenants = [];
let lastId = 0;

document.addEventListener('DOMContentLoaded', () => {
    const ajoutForm = document.getElementById('ajoutApprenantForm');
    const urlParams = new URLSearchParams(window.location.search);
    const apprenantId = urlParams.get('id');

    if (ajoutForm) {
        ajoutForm.addEventListener('submit', ajouterApprenant);
    }

    if (apprenantId) {
        afficherDetailsApprenant(apprenantId);
    } else {
        loadApprenants();
    }
});

function loadApprenants() {
    fetch('http://localhost:3000/apprenants')
        .then(response => response.json())
        .then(data => {
            apprenants = data;
            lastId = apprenants.length ? Math.max(...apprenants.map(apprenant => apprenant.id)) : 0;
            afficherApprenants();
        });
}

function afficherApprenants() {
    const apprenantsTableBody = document.querySelector('tbody');
    apprenantsTableBody.innerHTML = '';
    apprenants.forEach(apprenant => creerApprenantRow(apprenant));
}

function creerApprenantRow(apprenant) {
    const apprenantsTableBody = document.querySelector('tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <th scope="row">${apprenant.id}</th>
        <td>${apprenant.nom}</td>
        <td>${apprenant.prenom}</td>
        <td>${apprenant.email}</td>
        <td>
            <a href="details.html?id=${apprenant.id}" class="btn btn-success btn-sm">Détails</a>
            <button type="button" class="btn btn-danger btn-sm" onclick="supprimerApprenant(${apprenant.id})">Supprimer</button>
        </td>
    `;

    apprenantsTableBody.appendChild(row);
}

function ajouterApprenant(event) {
    event.preventDefault();

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;

    const newApprenant = {
        id: ++lastId,
        prenom,
        nom,
        email
    };

    fetch('http://localhost:3000/apprenants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newApprenant)
    })
    .then(response => response.json())
    .then(apprenant => {
        apprenants.push(apprenant);
        creerApprenantRow(apprenant);
        document.getElementById('ajoutApprenantForm').reset();
    });
}

function supprimerApprenant(id) {
    fetch(`http://localhost:3000/apprenants/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        apprenants = apprenants.filter(apprenant => apprenant.id !== id);
        afficherApprenants();
    });
}

function afficherDetailsApprenant(id) {
    fetch(`http://localhost:3000/apprenants/${id}`)
        .then(response => response.json())
        .then(apprenant => {
            if (apprenant) {
                document.getElementById('apprenantNomPrenom').textContent = `${apprenant.nom} ${apprenant.prenom}`;
                document.getElementById('apprenantEmail').innerHTML = `AWS Learner <span class="mx-2">|</span> <a href="mailto:${apprenant.email}">${apprenant.email}</a>`;
                // Vous pouvez ajouter d'autres champs ici
                document.getElementById('apprenantPays').textContent = apprenant.pays || "Guinee"; // Par défaut Guinee
                document.getElementById('apprenantSexe').textContent = apprenant.sexe || "M"; // Par défaut M
                document.getElementById('apprenantModule').textContent = apprenant.module || "AWS"; // Par défaut AWS
            } else {
                console.log('Aucun apprenant trouvé avec cet ID');
            }
        })
        .catch(error => console.error('Erreur:', error));
}





/*let apprenants = [];



let lastId = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Charger les apprenants existants
    loadApprenants();

    // Gérer le formulaire d'ajout d'apprenant
    const ajoutForm = document.getElementById('ajoutApprenantForm');
    if (ajoutForm) {
        ajoutForm.addEventListener('submit', ajouterApprenant);
    }
});

function loadApprenants() {
    fetch('http://localhost:3000/apprenants')
        .then(response => response.json())
        .then(data => {
            apprenants = data;
            // Déterminer le dernier ID utilisé
            lastId = apprenants.length ? Math.max(...apprenants.map(apprenant => apprenant.id)) : 0;
            afficherApprenants();
        });
}

function afficherApprenants() {
    const apprenantsTableBody = document.querySelector('tbody');
    apprenantsTableBody.innerHTML = '';
    apprenants.forEach(apprenant => creerApprenantRow(apprenant));
}

function creerApprenantRow(apprenant) {
    const apprenantsTableBody = document.querySelector('tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <th scope="row">${apprenant.id}</th>
        <td>${apprenant.nom}</td>
        <td>${apprenant.prenom}</td>
        <td>${apprenant.email}</td>
        <td>
            <a href="details.html?id=${apprenant.id}" class="btn btn-success btn-sm">Détails</a>
            <button type="button" class="btn btn-danger btn-sm" onclick="supprimerApprenant(${apprenant.id})">Supprimer</button>
        </td>
    `;

    apprenantsTableBody.appendChild(row);
}

function ajouterApprenant(event) {
    event.preventDefault();

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;

    const newApprenant = {
        id: ++lastId,
        prenom,
        nom,
        email
    };

    fetch('http://localhost:3000/apprenants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newApprenant)
    })
    .then(response => response.json())
    .then(apprenant => {
        apprenants.push(apprenant);
        creerApprenantRow(apprenant);
        document.getElementById('ajoutApprenantForm').reset();
    });
}

function supprimerApprenant(id) {
    fetch(`http://localhost:3000/apprenants/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        apprenants = apprenants.filter(apprenant => apprenant.id !== id);
        // 
        afficherApprenants();
    });
}

function getApprenantDetails(id) {
    return fetch(`http://localhost:3000/apprenants/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log('Détails de l\'apprenant:', data);
            return data;
        })
        .catch(error => console.error('Erreur:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const apprenantId = urlParams.get('id');

    console.log('apprenantId:', apprenantId);

    if (apprenantId) {
        getApprenantDetails(apprenantId)
            .then(apprenant => {
                console.log('apprenant:', apprenant);
                if (apprenant) {
                    document.querySelector('.card-body h4.mb-2').textContent = `${apprenant.nom} ${apprenant.prenom}`;
                    document.querySelector('.card-body p.text-muted.mb-4').innerHTML = `AWS Learner <span class="mx-2">|</span> <a href="mailto:${apprenant.email}">${apprenant.email}</a>`;
                    document.querySelector('.d-flex .text-muted.mb-0').textContent = "Guinee"; // Modifiez cette ligne si nécessaire
                } else {
                    console.log('Aucun apprenant trouvé avec cet ID');
                }
            })
            .catch(error => console.error('Erreur:', error));
    }
});








/*document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', ajouterApprenant);
  });
  
  function ajouterApprenant(event) {
    event.preventDefault();
  
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const sexe = document.getElementById('sexe').value;
    const pays = document.getElementById('pays').value;
    const modules = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
    const motivation = document.getElementById('motivation').value;
  
    const apprenant = {
      nom,
      prenom,
      sexe,
      pays,
      modules,
      motivation
    };
  
    fetch('http://localhost:3000/apprenants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apprenant)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Apprenant ajouté:', data);
      alert('Apprenant ajouté avec succès');
      form.reset();
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout de l\'apprenant');
    });
  }
  

// Charger les apprenants depuis le serveur au démarrage
/*document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/apprenants')
        .then(response => response.json())
        .then(data => {
            apprenants = data;
            apprenants.forEach(apprenant => creerApprenant(apprenant.id, apprenant.prenom, apprenant.nom));
        });
});*/


/*document.addEventListener('DOMContentLoaded', () => {
    // Charger les apprenants existants depuis le serveur
    fetch('http://localhost:3000/apprenants')
        .then(response => response.json())
        .then(data => {
            apprenants = data;
            apprenants.forEach(apprenant => creerApprenant(apprenant.id, apprenant.prenom, apprenant.nom, apprenant.email));
        });

    // Ajouter un nouvel apprenant
    document.getElementById('ajoutApprenantForm')?.addEventListener('submit', ajouterApprenant);
});

function creerApprenant(id, prenom, nom, email) {
    const apprenantsTableBody = document.querySelector('tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <th scope="row">${id}</th>
        <td>${nom}</td>
        <td>${prenom}</td>
        <td>${email}</td>
        <td>
            <a href="details.html?id=${id}" class="btn btn-success btn-sm">Détails</a>
            <button type="button" class="btn btn-danger btn-sm" onclick="supprimerApprenant(${id})">Supprimer</button>
        </td>
    `;

    apprenantsTableBody.appendChild(row);
}

function ajouterApprenant(event) {
    event.preventDefault();

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3000/apprenants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prenom, nom, email })
    })
    .then(response => response.json())
    .then(apprenant => {
        apprenants.push(apprenant);
        creerApprenant(apprenant.id, apprenant.prenom, apprenant.nom, apprenant.email);
        document.getElementById('ajoutApprenantForm').reset();
    });
}

function supprimerApprenant(id) {
    fetch(`http://localhost:3000/apprenants/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        apprenants = apprenants.filter(apprenant => apprenant.id !== id);
        const apprenantsTableBody = document.querySelector('tbody');
        const row = Array.from(apprenantsTableBody.children).find(row => row.children[0].textContent == id);
        if (row) {
            apprenantsTableBody.removeChild(row);
        }
    });
}*/





/*document.addEventListener('DOMContentLoaded', () => {
    // Charger les apprenants existants
    loadApprenants();

    // Gérer le formulaire d'ajout d'apprenant
    const ajoutForm = document.getElementById('ajoutApprenantForm');
    if (ajoutForm) {
        ajoutForm.addEventListener('submit', ajouterApprenant);
    }
});

function loadApprenants() {
    fetch('http://localhost:3000/apprenants')
        .then(response => response.json())
        .then(data => {
            apprenants = data;
            afficherApprenants();
        });
}

function afficherApprenants() {
    const apprenantsTableBody = document.querySelector('tbody');
    apprenantsTableBody.innerHTML = '';
    apprenants.forEach(apprenant => creerApprenantRow(apprenant));
}

function creerApprenantRow(apprenant) {
    const apprenantsTableBody = document.querySelector('tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <th scope="row">${apprenant.id}</th>
        <td>${apprenant.nom}</td>
        <td>${apprenant.prenom}</td>
        <td>${apprenant.email}</td>
        <td>
            <a href="details.html?id=${apprenant.id}" class="btn btn-success btn-sm">Détails</a>
            <button type="button" class="btn btn-danger btn-sm" onclick="supprimerApprenant(${apprenant.id})">Supprimer</button>
        </td>
    `;

    apprenantsTableBody.appendChild(row);
}

function ajouterApprenant(event) {
    event.preventDefault();

    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3000/apprenants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prenom, nom, email })
    })
    .then(response => response.json())
    .then(apprenant => {
        apprenants.push(apprenant);
        creerApprenantRow(apprenant);
        document.getElementById('ajoutApprenantForm').reset();
    });
}

function supprimerApprenant(id) {
    fetch(`http://localhost:3000/apprenants/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        apprenants = apprenants.filter(apprenant => apprenant.id !== id);
        afficherApprenants();
    });
}

function getApprenantDetails(id) {
    return fetch(`http://localhost:3000/apprenants/${id}`)
        .then(response => response.json());
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const apprenantId = urlParams.get('id');

    if (apprenantId) {
        getApprenantDetails(apprenantId)
            .then(apprenant => {
                if (apprenant) {
                    document.querySelector('.card-body .mb-2').textContent = `${apprenant.nom} ${apprenant.prenom}`;
                    document.querySelector('.card-body .text-muted.mb-4').innerHTML = `AWS Learner <span class="mx-2">|</span> <a href="mailto:${apprenant.email}">${apprenant.email}</a>`;
                    document.querySelector('.d-flex .text-muted.mb-0').textContent = "Guinee";
                }
            });
    }
});*/

