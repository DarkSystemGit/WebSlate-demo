
import * as fs from 'fs'
import * as path from 'path'
import * as JSDOM from 'jsdom'
import { system } from './system.js';
var assets = {}
assets.setup = function(){
  var configLocation = process.argv[3];
  system.config(configLocation);
}
assets.__search = function(query,terms){
  var search = {};
  for(let counter = 0;counter < terms.length;counter++){
    search[terms[counter]] = query.includes(terms[counter]);
  };
  return search
};
assets.__getTags = function (componentJsx){
    var document = new JSDOM('<DOCTYPE html><html><head></head><body></body></html>')  
    var temp = document.body.createElement("div");
    temp.innerHTML = componentJsx;
  
    var all = temp.getElementsByTagName("*");
    var tags = [];
    for (var i = 0, max = all.length; i < max; i++) {       
      var tagname = all[i].tagName;
      if (tags.indexOf(tagname) == -1) {
        tags.push(tagname);
      }
  
    }  
  }
assets.__getProperties = function(jsx){
  var jsx = jsx.split(" ")
  var props = {}
  for(var counter = 0;counter < jsx.length; counter++){
    if(jsx.includes(":") === true){
      var prop = jsx.split(" ").join(":").split(":")
      if(prop[0].length < 20){
        props[prop[0]] = prop[1]
      }
    }
  }
  return props
}
assets.__getUsedComponents = function(componentJsx){
  var avilblecomps = this.__avalibleComponents();
  return this.__search(componentJsx,avilblecomps);
}
assets.__getAllDirFiles = function (dirPath, arrayOfFiles) {
    files = fs.readdirSync(path.join(__dirname,dirPath))
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(path.join(__dirname,dirPath) + "/" + file).isDirectory()) {
        arrayOfFiles = this.__getAllDirFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(file)
      }
    })
    
    return arrayOfFiles
  }

assets.__getJsx = function (){
    for(let __counter = 0;__counter < this.__getAllDirFiles("./../../"+system.config()["componentsLocation"]).length;__counter++){
      const __jsxFileNames = this.__getAllDirFiles("./../../"+system.config()["componentsLocation"]);
      var __jsxFiles = [];
      var __file = system.__read(path.join("./../../"+system.config()["componentsLocation"],__jsxFileNames[counter]));
      __jsxFiles.push[__file]
    };
    return __jsxFiles;  
  }
assets.__compileJsx = function (jsx,prams){
  var stringJsx = jsx
  var jsx = jsx.split('${').join('}').split("}")
  for(var counter = 0;system.occurrences(stringJsx,"${",false)>counter;counter++){
    if(jsx[counter].charAt(0) !== "<"){
      jsx[counter] = system.eval(jsx[counter].replace("this."+prams[counter],prams[prams.keys()[counter]]))
    }
  }
  return jsx 
}
assets.__avalibleComponents = function(){
  var __components = {};
  let __files = this.__getAllDirFiles("./../../"+system.config()["componentsLocation"]);
  for(var i=0;i<files.length;i++){
    let __file = system.__read(path.join("./../../"+system.config()["componentsLocation"],__files[i]));
    let __tempname = __file.split('{')[1];
    let __rawCode = __tempname.split('}')[1];
    let __code = __rawCode.split('\\n');
    let __name = __tempname.split('}')[0]; 
    __components[__name] = __code;
  }
  return __components;
}
assets.__render = function(pageCode){
  var page = pageCode
  let UsedComps = this.__getUsedComponents(page);
  let UsedCompsKeys = UsedComps.keys()
  let __code = this.__avalibleComponents();
  let __components = {}
  for(let counter = 0;counter < __code.length;counter++){
    __components[UsedCompsKeys[counter]] = this.__compileJsx(__code[UsedCompsKeys[counter]],this.__getProperties(__code[UsedCompsKeys[counter]]))
  };
  for(let counter = 0; counter < UsedCompsKeys.length; counter++){
    page = page.replace(UsedCompsKeys[counter],__components[UsedCompsKeys[counter]])
  };
}
module.exports = assets