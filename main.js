// Obtener el formulario
const form = document.getElementById("form")

// Obtener la barra de busqueda
const search = document.getElementById("search")


// Escuchar evento submit del form

form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const username = search.value
    getUserData(username)
    search.value = ""
})

// Obtener la info del usuario en GitHub
async function getUserData(username) {
    const API = "https://api.github.com/users/"

    try {
        const userRequest = await fetch(API + username)

        if (!userRequest.ok) {
            throw new Error(userRequest.status)
        }
    
        const userData = await userRequest.json();
        
        
        if (userData.public_repos) {
            const reposRequets = await fetch(API + username + "/repos")
            const reposData = await reposRequets.json()
            userData.repos = reposData
        }

        showUserData(userData)

    } catch (error) {
        showError(error.message)
    }

   

}

//Funcion para componer el HTML del widget
function showUserData(userData) {
    console.log(userData)
}


//Funcion para gestionar Errores
function showError(error) {

}
