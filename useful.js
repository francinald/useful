export default class Useful{
    static listenner(element,events,cb){
        events.split(" ").forEach(event=>{
            element.addEventListener(event,cb,false)
        })
    }
    static getFormUse(form){
        const user = {}
        ;[...form.elements].forEach(field => {
            if(field.name){
                if(field.type === "radio"){
                    if(field.checked){
                        user[field.name] = field.value
                    }
                }else if(field.type === "checkbox"){
                    user[field.name] = field.checked
                }else{
                    user[field.name] = field.value
                }
            }
        })
        return user
    }
    static getPhoto(form){
        return new Promise((resolve,reject)=>{
            const elements = [...form.elements].filter(files => files.type === "file")
            const photo = elements[0].files[0]
            const file = new FileReader()
            file.onload = ()=>{
                resolve(file.result)
            }
            file.onerror = err => {
                reject({err})
            }
            file.readAsDataURL(photo)
        })
    }
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