const baseUrl = process.env.NODE_ENV === 'development'? "http://127.0.0.1:8000":"https://domain.com"

console.log(process.env)
export const api = {
    posts:{
        list:`${baseUrl}/api/posts/`,
        retrieve: slug => `${baseUrl}/api/posts/${slug}`,
        create:`${baseUrl}/api/posts/create/`,
        
    }
}