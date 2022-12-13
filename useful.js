export default class Useful{
    static httpRequest(method,url,dados=null){
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest()
            xhr.open(method.toUpperCase(),url,true)
            xhr.setRequestHeader("Content-Type","application/json")
            xhr.onreadystatechange = ()=>{
                if(xhr.responseType === 4 && xhr.status < 304){
                    resolve(JSON.parse(xhr.responseText))
                }
            }
            xhr.onerror = err => {
                reject({ERROR: err})
            }
            xhr.send(JSON.stringify(dados))
        })
    }
}