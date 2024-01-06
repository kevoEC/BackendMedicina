import axios from "axios"

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJuSnVpYzVwbXk1T1hGSjVmY1RIQTdUNVktRHZVbVVOR2xxVHBqS0hDVnU4In0.eyJleHAiOjE3MDQ0MzA5MjYsImlhdCI6MTcwNDM5NDk4MSwiYXV0aF90aW1lIjoxNzA0Mzk0OTI2LCJqdGkiOiJmNmEzNzUwMy0zM2VkLTRhMWUtOTk2Ny02YTU1YmUzZWU4MTYiLCJpc3MiOiJodHRwczovL2F1dGgubWVzaGNhcGFkZS5jb20vcmVhbG1zL21lc2hjYXBhZGUtbWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNzcxZjExYzItYTllYi00YjljLWIzZTEtZGY3ZTMxZDNhMTE2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVzaGNhcGFkZS1tZSIsIm5vbmNlIjoiMGRhNzM1ZGEtZDRkYi00N2Q5LWE1NTEtYjVmNDYxNTE2YWZhIiwic2Vzc2lvbl9zdGF0ZSI6ImZhYWUzOTdlLWZiOGEtNDhhNS1iZWY4LTZkNzYwZmFhNGJhNCIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9tZXNoY2FwYWRlLmNvbSIsImh0dHBzOi8vbWUubWVzaGNhcGFkZS5jb20iLCJodHRwczovL21lc2hjYXBhZGUubWUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1nY21jIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiZmFhZTM5N2UtZmI4YS00OGE1LWJlZjgtNmQ3NjBmYWE0YmE0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiQnlwYXNzR2FzdHJpY28gRUMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYWJsb3d3ZTIwMTFAaG90bWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiQnlwYXNzR2FzdHJpY28iLCJmYW1pbHlfbmFtZSI6IkVDIiwiZW1haWwiOiJwYWJsb3d3ZTIwMTFAaG90bWFpbC5jb20ifQ.k-o-KvLpxzq72cgeGPU2YFdZ3Z7X23nqrmS_pmJz9viIJVStzHlBZSXCr_QJAVFCxgqIimByZBz-OEW9ZZEOIb3wZ1oTfT70XMidoxzWuo5z2g3iv6puJ8WBRT0Q7DBMI5sDy7Q0VLqeF8JBWDNhsjJjuVRkpTZ5XjFNrd0_vWUB1cVPzGQLfDfSzbIr50Z0wOss1etDPlDVeFEEuwDIGn85NmYrL0hoxCYpl7UtjgabJhJrqhm7WyVQpkHZzdy5ED8XnKrwxCpDVrde-qxFec0XV98ORPoQzzL_FksRVQKnXjVh_dlJCI6ffqH0zWajQ_hP9NTrTKuS28H6_MY30A"


const createAvatar = async (req, res) => {
    try {
        const url = req.body.url

        const response = await axios({
            method: 'POST',
            url,
            headers: {
                // Añade cualquier encabezado adicional necesario
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        console.log('r', response)

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }

};


const createImage = async (req, res) => {
    try {

        const url = req.body.url
        const response = await axios({
            method: 'POST',
            url,
            headers: {
                // Añade cualquier encabezado adicional necesario
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        console.log('r', response)

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }

}



const fitAvatar = async (req, res) => {

    try {
        const url = req.body.url
        const data = req.body.data

        const response = await axios.post(url, data, {
            headers:  {
                // Añade cualquier encabezado adicional necesario
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        console.log('r', response)

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }

}


const getAvatar = async (req, res) => {

    try {
        const url = req.body.url

        const response = await axios.get(url, {
            headers:  {
                // Añade cualquier encabezado adicional necesario
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        console.log('r', response)

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
}

export { createAvatar, createImage, fitAvatar, getAvatar };