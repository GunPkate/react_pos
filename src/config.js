const Config = {
    api: 'https://localhost:7106',
    headers: {
        headers: {
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    }
}

export default Config;