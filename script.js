const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const userModal = document.getElementById("user-modal");
const modalName = document.querySelector("[data-modal-name]");
const modalEmail = document.querySelector("[data-modal-email]");
const modalPhone = document.querySelector("[data-modal-phone]");
const modalWebsite = document.querySelector("[data-modal-website]");
const modalCompany = document.querySelector("[data-modal-company]");
const modalAddress = document.querySelector("[data-modal-address]");
const closeModal = document.querySelector(".close");


let users = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    users.forEach(user =>{
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible)
    })

   
})
fetch("data.txt")
    .then(res => res.json()
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const name = card.querySelector("[data-name]");
            const email = card.querySelector("[data-email]");
            name.textContent = user.name;
            email.textContent = user.email;
            userCardContainer.append(card);

            card.addEventListener("click", () => {
                modalName.textContent = user.name;
                modalEmail.textContent = user.email;
                modalPhone.textContent = user.phone;
                modalWebsite.textContent = user.website;
                modalCompany.textContent = user.company.name;
                modalAddress.textContent = `${user.address.street}, ${user.address.city}`;
                userModal.classList.add("show");
            });

            return{ name: user.name, email: user.email, element: card};
        });
    }));

closeModal.addEventListener("click", () => {
    userModal.classList.remove("show");
});
    
userModal.addEventListener("click", (e) => {
    if (e.target === userModal) {
        userModal.classList.remove("show");
    }
});