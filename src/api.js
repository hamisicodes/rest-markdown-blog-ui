const baseUrl = process.env.NODE_ENV === 'development'? "http://127.0.0.1:8000":"https://domain.com"

console.log(process.env)
export const api = {
    auth:{
        login: `${baseUrl}/dj-rest-auth/login/`,
        register:`${baseUrl}/dj-rest-auth/registration/`
    },
    posts:{
        list:`${baseUrl}/api/posts/`,
        retrieve: slug => `${baseUrl}/api/posts/${slug}`,
        create:`${baseUrl}/api/posts/create/`,
        update: slug => `${baseUrl}/api/posts/${slug}/update`,
        delete: slug => `${baseUrl}/api/posts/${slug}/delete`,
        
    }
}