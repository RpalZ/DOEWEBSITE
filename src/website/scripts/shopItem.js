
window.onload = loadIn


let item;

function userCardClicked(el) {
    const userUtils = el.nextElementSibling
    userUtils.classList.toggle('active')
}

async function setUpProd() {

    try {


        const localUrl = window.location.href
        const id = localUrl.split('/').pop()
        const url = `https://dummyjson.com/products/${id}`
        const res = await axios.get(url)
        if (!res.data) {
            return window.location.href = '/shop'
        }
        const { data } = res
        console.log(data)
        item = data

        const template = document.getElementsByTagName('template')[0]
        const clone = template.content.cloneNode(true)
        const prodImage = clone.querySelector('.prod-image')
        const img = prodImage.children[0]
        const prodInfo = clone.querySelector('.prod-info')
        const h1 = prodInfo.children[0]
        const span = prodInfo.children[1]
        const p = prodInfo.children[2]
        const button = clone.querySelector('.buy-btn')
        const btnSpan = button.children[0]

        btnSpan.innerText = "$" + data.price
        img.src = data.images[0]
        h1.innerText = data.title
        span.innerText = data.brand
        p.innerText = data.description

        //appending
        const productElement = document.getElementsByClassName('product')[0]
        productElement.append(clone)

    } catch (e) {
        window.location.href = '/shop'
        console.log(e)
    }
}


async function loadIn() {

    setUpProd()
}