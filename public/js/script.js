
const userUl = $('.users');
const searchText = $('.searchText');
let users = []

$.ajax({
    url: "/users/get-users",
    contentType: "application/json",
    success: function(data) {
        users = data
        createList(data)
    }

}) 

function createList(users) {
    userUl.empty()
    users.forEach(u => {
        userUl.append(`<a href="/users/${u._id}"><li>${u.username}</li></a>`)
    })    
}

searchText.keyup((evt) => {
    // console.log(evt.target.value)
    createList(users.filter(user => user.username.toLowerCase().includes(evt.target.value.toLowerCase())))
})


console.log(users)
