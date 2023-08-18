const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}


function onChange() {
    const password = document.querySelector('input[name=fpassword]');
    const confirm = document.querySelector('input[name=fconfirm]');
    if (confirm.value === password.value) {
        confirm.setCustomValidity('');
    } else {
        confirm.setCustomValidity('Passwords do not match');
    }
}

async function validate(form, event) {
    console.log(form.elements)
    event.preventDefault()
    const elArray = [...form.elements]
    // console.log(elArray[0].nodeName)
    const filteredElements = elArray.filter(val => val.nodeName === "INPUT")
    let filledIn = true
    for (let element of filteredElements) {
        if (element.value == '') {
            console.log(true)
            filledIn = false
        }
    }
    if (!filledIn) {
        alert("Please fill in all fields")
        filledIn = true
        return
    }
    const email = filteredElements.filter(f => f.name === 'femail')[0].value
    const username = filteredElements.filter(f => f.name === 'fusername')[0].value
    const password = filteredElements.filter(f => f.name === 'fpassword')[0].value
    // const emailVal = email.value
    const regTest = new RegExp('.com')
    if (!regTest.test(email)) {
        return alert('Please fill in a valid email address')
    }
    try {
        console.log('sent')
        const res = await axios.post('/home/signup',
            { username, email, password })
        const { data } = res

        if (isEmpty(data)) return alert('Something went wrong. Try again')
        if (data.status === 400) return alert('This account has already been registered.')
        if (data.status === 200) {
            window.location.href = `/home/user/${data.user}`
            return alert("Successfully registered!")
        }
    } catch (e) {
        console.error(e)
    }

    // console.log(filteredElements)
}

