export var system = {}
system.__read = function (__filePath){
    const __file = fs.readFileSync(path.join(__dirname,__filePath),'utf-8');
    return __file;
  };
system.__mutiLineRead = function (__filePath){
  const __file = fs.readFileSync(path.join(__dirname,__filePath),'utf-8').split("\\n");
  return __file;
};
system.occurrences = function (string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
system.eval = function(obj){return Function('"use strict";return (' + obj + ')')();}
system.config = function(configLocaction){
    if(global[config] === undefined){
        var configFile = this.__mutiLineRead(configLocaction)
        global[config] = {}
        for(var counter = 0;counter < configFile.length;counter++){
            config[config[counter].split("=")[0]] = config[counter].split("=")[1]

        }
    }else{
        return global[config]
    }
}

system.setConfig = function(){
    var configLocation = process.argv[3];
    console.log("The config file is located at "+configLocaction)
}