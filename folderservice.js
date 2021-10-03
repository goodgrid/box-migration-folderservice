import axios from "axios";
import { config } from "./config.js";

const boxAuth = "Bearer " + config.boxToken;
const boxApi = axios.create({
    baseURL: config.boxDefaultBaseUrl,
    headers: {"Authorization": boxAuth}
});


class FolderService {
    constructor() {
        this.cache = [{folderId:0,path:""}];
    }

    showCache() {
        return this.cache;
    }


    /*
        This is an async function, so needs to be called with await. For example:

        import { FolderService } from "./folderservice.js";
        var folderservice = new FolderService();

        console.log(await folderservice.getFolderId("/30"));
        console.log("-----------next--------------")
        console.log(await folderservice.getFolderId("/30/31"));
    */

    async getFolderId(path) {
        path = path.replace("/Company Home/Sites", "").trim();
        let entry = this.cache.find(entry => entry.path === path);
        return (entry) ? entry.folderId : (await this.fetchFolderId(path));        
    }

    async fetchFolderId(path) {
        console.log(`${path} was not cached, so requesting Box`)
        let pathArray = path.split("/");
        
        let parentFolderId = await this.getFolderId(pathArray.slice(0, pathArray.length -1 ).join("/"))
        let folderName = pathArray[pathArray.length -1]
        
        let requestBody = {name: folderName, parent: {id: parentFolderId}};
        
        try {
            let response = await boxApi.post("/folders/", requestBody)
            let returnedFolderId = response.data.id;
            this.cache.push({folderId:returnedFolderId,path:path})
            return returnedFolderId
        } 
        catch(error) {
            if (error.response.status == 409) {
                let returnedFolderId = await error.response.data.context_info.conflicts[0].id;
                this.cache.push({folderId:returnedFolderId,path:path})
                return await returnedFolderId
            } else {
                console.log("FetchFolder (error handling): Returning error", error.response.statusText,requestBody)
            }
        }
    }


}

  export { FolderService } ;

  