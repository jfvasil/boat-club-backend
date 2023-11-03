document.querySelector('#register').addEventListener('submit', async(e) => {
    e.preventDefault()

const name = document.querySelector('.name').value
const email =  document.querySelector('.email').value
const password = document.querySelector('.password').value


    try{
        const res = await fetch('http://localhost:3000//api/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })

        if(res.ok){
            console.log('User signed up!')
        } else{
            console.error('Falied to sign up user!')
        }

    } catch(error){
        console.error(error)
    }

})