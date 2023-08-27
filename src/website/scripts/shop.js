



//pagination along with products

let orgProducts;
let products;
let currentPage = 1
const filters = {
    alphaSort: false,
    priceSort: false,
    categories: []
}
let liArr = []
const prodLimit = 20
// const renderliArr = []

const renderliArrLimit = 6


window.onload = loadedIn


async function getCategories() {
    const url = 'https://dummyjson.com/products/categories'
    const res = await axios.get(url)
    const { data } = res
    // console.log(data)
    return data
}


async function renderCategories() {
    const categories = await getCategories()

    const prodUtils = document.getElementsByClassName('product-utils')[0]
    const template = document.getElementsByTagName('template')[0]
    // console.log({ prodUtils, categories })
    categories.forEach(val => {
        const clone = template.content.cloneNode(true)
        const catLink = clone.querySelector('.category')
        catLink.setAttribute('onclick', 'filterClicked(this)')
        // catLink.setAttribute('value', val)
        catLink.innerText = val;
        prodUtils.append(catLink)
    })
}

function userCardClicked(el) {
    const userUtils = el.nextElementSibling
    userUtils.classList.toggle('active')
}

function dropBtnProdClicked(element) {
    const prodUtils = element.nextElementSibling
    prodUtils.classList.toggle('active')
    element.classList.toggle('active')
}

function filterClicked(filterNode) {
    const category = filterNode.innerText
    const categoryArr = filters.categories
    // console.log(categoryArr)
    const catExists = categoryArr.includes(category)
    if (catExists) {
        categoryArr.splice(categoryArr.indexOf(category), 1)
    } else {
        categoryArr.push(category)
    }
    filterNode.classList.toggle('active', !catExists)

    const filteredArr = productReducer(filterProds('', filters))
    products = filteredArr
    console.log(products)
    initPagination(products.theArray)
    prodRenderer(0, products.theArray)
}

function productReducer(prodArr) {
    return prodArr.reduce((acc, cur, i) => {
        const limiter = (i + 1) % prodLimit == 0
        // console.log(limiter)
        const { theArray, counter } = acc
        const subArray = theArray[counter]

        if (!subArray) {
            const initArray = [cur]
            theArray[counter] = initArray
        } else if (limiter) {
            theArray[counter].push(cur)
            acc.counter++;
        } else {
            theArray[counter].push(cur)
        }


        return acc
    }, { counter: 0, theArray: [] })
}


async function loadedIn() {


    // console.log(searchBar)
    renderCategories()


    const result = await axios.get('https://dummyjson.com/products?limit=0')

    const data = result.data
    orgProducts = data.products
    products = productReducer(data.products)

    // console.log(products.theArray)
    prodRenderer(0, products.theArray)
    initPagination(products.theArray)
}

function initPagination(arr) {
    const ul = document.querySelector('.pagination > ul')
    liArr = []
    ul.textContent = ''

    arr.forEach((val, i) => {

        //setting the pagination

        const li = document.createElement('li')
        i == 0 ? li.setAttribute('class', 'link active') : li.setAttribute('class', 'link')
        li.setAttribute('value', i + 1)
        li.setAttribute('onclick', 'pageClicked(event)')
        li.innerText = i + 1
        liArr.push(li)
    })


    for (let i = 0; i < renderliArrLimit; i++) {

        if (liArr[i]) {
            ul.append(liArr[i])
        }
    }


    let timeout;

    const searchBar = document.getElementById('query-search')
    searchBar.addEventListener('input', e => {
        const value = e.target.value

        // const filteredProducts = filterProds(value, filters)
        // // console.log(filteredProducts)
        // const prodsFiltered = productReducer(filteredProducts)
        // // console.log(prodsFiltered)
        // if (!filteredProducts[0]) {
        //     initPagination([[]])
        //     prodRenderer(0, [[]])
        // } else {
        //     initPagination(prodsFiltered.theArray)
        //     prodRenderer(0, prodsFiltered.theArray)
        // }
        // products = prodsFiltered

        if (timeout) {
            clearTimeout(timeout)
        }

        const inTimeout = setTimeout(() => {
            // console.log('sent')
            if (value === document.getElementById('query-search').value) {
                //code...
                const filteredProducts = filterProds(document.getElementById('query-search').value, filters)
                // console.log(filteredProducts)
                const prodsFiltered = productReducer(filteredProducts)
                // console.log(prodsFiltered)
                if (!filteredProducts[0]) {
                    initPagination([[]])
                    prodRenderer(0, [[]])
                } else {
                    initPagination(prodsFiltered.theArray)
                    prodRenderer(0, prodsFiltered.theArray)
                }
                products = prodsFiltered

            }
        }, 1000);

        timeout = inTimeout
        // console.log(value)
    })

    // console.log(ul)
}


function filterProds(query, filters) {
    //query is a string
    //filters is an object of filters
    const queryStr = query.toLowerCase()
    const { categories, alphaSort, priceSort } = filters
    // console.log(products)
    const filteredArr = orgProducts.reduce((acc, cur) => {
        //lets put some conditions 
        //query matches name or desc
        //filters matches category of such item


        // console.log(val)
        const isQueryName = cur.title.toLowerCase().includes(queryStr)
        // console.log(val.title)
        const isQueryDesc = cur.description.toLowerCase().includes(queryStr)
        const isCategory = !categories[0] ? true : categories.includes(cur.category)
        const isMatch = (isQueryName || isQueryDesc) && isCategory
        // console.log({ isQueryName, isQueryDesc, isCategory, isMatch, query })
        if (isMatch) acc.push(cur)


        return acc
    }, [])

    if (alphaSort) {
        filteredArr.sort((a, b) => a.title > b.title && 1 || -1)
    }
    if (priceSort) {
        filteredArr.sort((a, b) => a.price - b.price)
    }
    return filteredArr
}

function pageMutate(direction) {
    const ul = document.querySelector('.pagination > ul')
    const links = document.getElementsByClassName('links')
    const lastLink = ul.lastElementChild
    const firstLink = ul.firstElementChild
    if (direction > 0) {
        // const chIndex = renderliArrLimit - 1
        const newUl = liArr[lastLink.value]
        firstLink.remove()
        ul.append(newUl)
    } else if (direction < 0) {
        const newUl = liArr[firstLink.value - 2]
        // console.log('prev')
        lastLink.remove()
        firstLink.insertAdjacentElement('beforebegin', newUl)
    }
}


function prodRenderer(index, prodArr) {
    //removes all current elements in products class and replaces with indexed prod array
    const prodList = document.getElementsByClassName('product-list')[0]
    prodList.textContent = ''
    const subProdArr = prodArr[index]
    subProdArr.forEach((val, i) => {
        const card = createProductCards(val, i)
        prodList.append(card)
    })
    currentPage = index + 1
}

function createProductCards(productObj, id) {
    //returns  li element which contains the product card
    const liProd = document.createElement('li')
    const prodCard = document.createElement('div')
    const image = document.createElement('div')
    const title = document.createElement('h1')
    const desc = document.createElement('p')
    const price = document.createElement('h2')
    const buyBtn = document.createElement('button')
    const cart = document.createElement('i')

    cart.setAttribute('class', 'fa-solid fa-plus')
    title.innerText = productObj.title
    desc.innerText = productObj.description.length > 60 ? productObj.description.trim().slice(0, 60) + '...' : productObj.description.trim()
    // price.innerText = 
    buyBtn.innerText = "$" + productObj.price;

    // buyBtn.append(cart)

    prodCard.setAttribute('value', id)
    // console.log(prodCard)
    image.classList.add('prod-img')
    image.style.background = `url('${productObj.images[0]}')`
    liProd.setAttribute('class', 'product')
    // image.setAttribute('src', productObj.images[1] || productObj.images[0])
    prodCard.setAttribute('class', 'product-card');

    prodCard.append(image)
    prodCard.append(title)
    prodCard.append(desc)
    // prodCard.append(price)
    prodCard.append(buyBtn)
    liProd.append(prodCard)

    return liProd
}


function pageClicked(event) {

    let links = document.getElementsByClassName('link')
    for (let l of links) {
        l.classList.remove('active')
    }
    event.target.classList.add('active')

    currentPage = event.target.value
    prodRenderer(currentPage - 1, products.theArray)
    // console.log(currentPage)
}

function nextBtn() {
    // console.log(currentPage, 'next')
    if (currentPage < liArr.length) {
        let links = document.getElementsByClassName('link')
        let linksArr = [...links]
        let lastLink = links[links.length - 1]
        let activeLink = document.querySelector('.link.active')
        const index = linksArr.indexOf(activeLink)
        // console.log({ links, linksArr, index })
        for (let l of links) {
            l.classList.remove('active')
        }
        currentPage++;
        if (activeLink.value == lastLink.value) {
            pageMutate(1)

            lastLink.classList.add('active')
        } else {

            links[linksArr.indexOf(activeLink) + 1].classList.add('active')
        }
        prodRenderer(currentPage - 1, products.theArray)

    }
}

function prevBtn() {
    // console.log(currentPage)
    if (currentPage > 1) {
        let links = document.getElementsByClassName('link')
        let linksArr = [...links]
        let activeLink = document.querySelector('.link.active')
        let firstLink = links[0]
        for (let l of links) {
            l.classList.remove('active')
        }

        // console.log('prev')
        currentPage--;
        if (activeLink.value == firstLink.value) {
            pageMutate(-1)
            links[0].classList.add('active')
        } else {
            // console.log(activeLink.value, 'value')
            links[linksArr.indexOf(activeLink) - 1].classList.add('active')
        }

        prodRenderer(currentPage - 1, products.theArray)

    }
}


//on search event







async function searched(form, event) {
    event.preventDefault()
    const searchBar = form[0]
    const searchValue = searchBar.value
    const url = window.location.search

    const filtered = filterProds(searchValue, filters)
    const prods = productReducer(filtered)
    if (prods.theArray.length == 0) {
        initPagination([[]])
        prodRenderer(0, [[]])
    }
    else {
        initPagination(prods.theArray)
        prodRenderer(0, prods.theArray)
    }

    products = prods

}


