import { FolderService } from "./folderservice.js";

var folderservice = new FolderService();

console.log(await folderservice.getFolderId("/30"));
console.log("-----------next--------------")
console.log(await folderservice.getFolderId("/30/31"));
console.log("-----------next--------------")
console.log(await folderservice.getFolderId("/30/31/40"));
console.log("-----------next--------------")
console.log(await folderservice.getFolderId("/30/31/41"));
console.log(await folderservice.getFolderId("/30/31/42"));
console.log(await folderservice.getFolderId("/30/31/43"));


console.log(folderservice.showCache())