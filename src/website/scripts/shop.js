// const { last } = require("lodash");



{
    //pagination along with products

    let products;
    let currentPage = 1
    const liArr = []
    // const renderliArr = []
    const renderliArrLimit = 6


    window.onload = loadedIn

    async function loadedIn() {
        const result = await axios.get('https://dummyjson.com/products?limit=0')

        const data = result.data
        products = data.products.reduce((acc, cur, i) => {
            const limiter = (i + 1) % 10 == 0
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

        // console.log(products.theArray)
        prodRenderer(0, products.theArray)
        initPagination(products.theArray)
    }

    function initPagination(arr) {
        const ul = document.querySelector('.pagination > ul')

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
            ul.append(liArr[i])
        }

        console.log(ul)
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
    }

    function createProductCards(productObj, id) {
        //returns  li element which contains the product card
        const liProd = document.createElement('li')
        const prodCard = document.createElement('div')
        const image = document.createElement('img')
        const title = document.createElement('h1')
        const desc = document.createElement('p')
        const price = document.createElement('h2')
        const buyBtn = document.createElement('button')
        const cart = document.createElement('i')
        cart.setAttribute('class', 'fa-solid fa-plus')
        title.innerText = productObj.title
        desc.innerText = productObj.description
        // price.innerText = 
        buyBtn.innerText = "$" + productObj.price;

        // buyBtn.append(cart)

        prodCard.setAttribute('value', id)
        // console.log(prodCard)
        liProd.setAttribute('class', 'product')
        image.setAttribute('src', productObj.images[1] || productObj.images[0])
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
            let lastLink = links[5]
            let activeLink = document.querySelector('li.active')
            for (let l of links) {
                l.classList.remove('active')
            }
            currentPage++;
            if (activeLink.value == lastLink.value) {
                pageMutate(1)

                links[5].classList.add('active')
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
            let activeLink = document.querySelector('li.active')
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

}