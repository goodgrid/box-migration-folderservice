import { Folderservice } from "./folderservice.js";

var folderservice = new Folderservice();


folderservice.getFolderId("/30").then(folderId => {
    console.log(folderId)

    console.log(folderservice.showCache())
})
folderservice.getFolderId("/30/31").then(folderId => {
    console.log(folderId)

    console.log(folderservice.showCache())
})
    
   