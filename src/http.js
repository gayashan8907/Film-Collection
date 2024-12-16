export async function updatedUserFilms(films) {
    const response = await fetch('http://localhost:3000/user-films',{
        method: 'PUT',
        body:JSON.stringify({films:films}),
        headers: {
            'Content-Type':'application/json'
        }
    })
    const resData = await response.json() 
    if (!response.ok){
        throw new Error('Failed to update user data')
    }
    return resData.messsage
}