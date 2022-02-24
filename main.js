// Obtener el formulario
const form = document.getElementById("form")

// Obtener la barra de busqueda
const search = document.getElementById("search")

// Obtener widget del usuario
const usercard = document.getElementById("usercard")


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
    let userContent = `
    <img src="${userData.avatar_url}" alt="foto de perfil">
    <h1>${userData.name}</h1>
    <p>${userData.bio}</p>
    <section class="data">
        <ul>
            <li>Followers: ${userData.followers}</li>
            <li>Following: ${userData.following}</li>
            <li>Repos: ${userData.public_repos}</li>
        </ul>
    </section>`

    if (userData.repos) {
        userContent += `<section class="repos">`
        userData.repos.slice(0, 7).forEach(repo => {
            userContent += `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`
        })
        userContent += `</section>`

    }

    usercard.innerHTML = userContent

}

//Funcion para gestionar Errores
function showError(error) {
    const errorContent = `<h1 class="error">Error 🐱‍👤 ${error}</h1>`
    usercard.innerHTML = errorContent
}
