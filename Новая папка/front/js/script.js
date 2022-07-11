import {
    http
} from "./module.js";
import {
    v4 as uuidv4
} from 'https://jspm.dev/uuid';

let url = http
let data = []



let form = document.forms.task
let block_items = document.querySelector('.block_items')
let modal_bg = document.querySelector('.modal_bg')
let modal_count = document.querySelector('.modal_count')
let form2 = document.forms.change
let new_btn = document.querySelector('.new_btn')

function react() {
    axios.get(url)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                data = res.data
                reload(data)
            }
        })
}

react()


form.onsubmit = (e) => {
    e.preventDefault();

    let task = {
        id: uuidv4()
    }


    let fm = new FormData(form)
    fm.forEach((value, key) => {
        task[key] = value
    })

    postItem(task)
}


function reload(arr) {
    block_items.innerHTML = ""
    for (let item of arr) {
        let year = 2022 - item.year

        block_items.innerHTML += `
        <div class="block" id="${item.id}">
            <div class="block_number">
                <span class="text_lenght">1</span>
            </div>
            <div class="block_name">
                <span class="text_span">${item.name}</span>
            </div>
            <div class="block_year">
                <span class="text_span">${year}</span>
            </div>
            <div class="block_actions">
                <div class="block_img">
                <img class="change" src="./assets/img/change.png" alt="">
                <img class="del" src="./assets/img/delete.png" alt="">
                </div>
            </div>
        </div>
        `
        let del = document.querySelectorAll('.del')
        let change = document.querySelectorAll('.change')

        del.forEach(elem => {
            elem.onclick = (event) => {
                let id = event.target.parentNode.parentNode.parentNode.id
                deleteItem(id)
            }
        })

        change.forEach(elem => {
            elem.onclick = (event) => {
                let id = event.target.parentNode.parentNode.parentNode.id
                setTimeout(() => {
                    modal_bg.style.display = "block"
                }, 300);

                setTimeout(() => {
                    modal_count.style.top = "50%"
                }, 500);
                submit(id)
            }
        })

        modal_bg.onclick = () => {
            setTimeout(() => {
                modal_bg.style.display = "none"
            }, 500);
            setTimeout(() => {
                modal_count.style.top = "-250%"
            }, 300);
        }



    }
}


function deleteItem(id) {
    axios.delete(`${url}/${id}`)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                res.data
            }
        })
}

function postItem(post) {
    axios.post(url, post)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                res.data
            }
        })
}


function submit(id) {
    form2.onsubmit = (e) => {
        e.preventDefault()
        let change = {}
    
        let fm = new FormData(form2)
        fm.forEach((value, key) => {
            change[key] = value
        })
    
        editeItem(id)
    }
}

let new_name = document.querySelector('.new_name')
let new_year = document.querySelector('.new_year')

function editeItem(id) {
    axios.patch(`${url}/${id}`, {
        name: new_name.value,
        year: new_year.value
    })
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                res.data
            }
        })
}

