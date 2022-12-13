export default class Useful{
    static get(url){
        return this.httpRequest("GET",url)
    }
    static post(url,dados){
        return this.httpRequest("POST",url,dados)
    }
    static put(){
        return this.httpRequest("PUT",url,dados)
    }
    static delete(){
        return this.httpRequest("DELETE",url,dados)
    }
    static httpRequest(method,url,dados=null){
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest()
            xhr.open(method.toUpperCase(),url,true)
            xhr.setRequestHeader("Content-Type","application/json")
            xhr.setRequestHeader('Access-Control-Allow-Origin','*')
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4 && xhr.status < 304){
                    if(xhr.status === 200){
                        resolve(JSON.parse(xhr.responseText))
                    }
                }
            }
            xhr.onerror = err => {
                reject({ERROR: err})
            }
            xhr.send(JSON.stringify(dados))
        })
    }
}