const form  = document.querySelector("form")
let formData = new FormData()


form.addEventListener("submit", (e) => {
    e.preventDefault()
    formData.append("upload", document.querySelector("input").files[0]);
//     fetch('http://127.0.0.1:5500/api/user/image', {
//         method: "POST", 
//         headers:{
//             "x-csrf-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmU2ODhkYjAxMDg0ZTAyZDk0NjE1MyIsImlhdCI6MTY3MDY1MTg0NCwiZXhwIjoxNjcwNzM4MjQ0fQ.bd6ZD35QkPUOYbYC-WDw5Z493o3a1lY31B0lOP--dgQ"
//         },
//         body: formData,
//     });
// })

fetch('/image', {
    method: "POST", 
    headers:{
        "x-csrf-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmU2ODhkYjAxMDg0ZTAyZDk0NjE1MyIsImlhdCI6MTY3MDY1MTg0NCwiZXhwIjoxNjcwNzM4MjQ0fQ.bd6ZD35QkPUOYbYC-WDw5Z493o3a1lY31B0lOP--dgQ"
    },
    body: formData,
});
})