
async function validate(form, event) {

    event.preventDefault()
    console.log(form.elements)
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
    } else {
        try {

            const pass = filteredElements.filter(f => f.name === "fpassword")[0].value
            const email = filteredElements.filter(f => f.name === "femail")[0].value
            console.log({ pass, email })
            const res = await axios.post('http://localhost:8000/home/login',
                {
                    pass,
                    email
                },
                { withCredentials: true }
            )
            console.log(res.data)
            const { data } = res
            if (data.status === 404) return alert('Invalid email or password')
            if (!data) return alert('Something went wrong. Try again')
            alert('Successfully Logged in!')
            window.location.href = `user/${data.user}`

        } catch (e) {
            console.error(e)
        }

    }
}

