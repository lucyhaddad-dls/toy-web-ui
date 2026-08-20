// input data is a list of "name": , "value": {"val": <>, "dtype": <>}

export const fetchInputValues = async() => {
    const response = await fetch("/api/input")
    const data = await response.json()

    console.log(data)
}