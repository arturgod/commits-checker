const git = require('simple-git');
const fs = require('fs');
const util = require('util')
const path = './repo-tmp';
const repoUrl = 'https://github.com/arturgod/monorepo.git';
const fs_writeFile = util.promisify(fs.writeFile)
const fs_readFile = util.promisify(fs.readFile)

main();

//mozna pisac tak
/*
const readFilePromise = (resolve, reject) => {
  fs.readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
    if(err) {reject(err)}
    else {resolve(data)}
  }  
)};
const b = function(){
  return new Promise(
    readFilePromise
  )
};
b().then(...)
*/
// lub tak
/*
const b = function(){
  return new Promise(
    (resolve, reject) => {
      fs.readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
        if(err) {reject(err)}
        else {resolve(data)}
      })
    }  
  )
};
b.then(...);
*/

function main(){
  const content = '2222';
  const readFilePromise = (resolve, reject) => {
    fs.readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
      if(err) {reject(err)}
      else {
        console.log('reading: ', data);
        resolve(data)
      }
    }  
  )};
  const writeFilePromise = function(){
    return new Promise(
      (resolve, reject) => {
        fs.writeFile(`logz-master.json`, '222', function(err,data){
          if(err) {reject(err)}
          else {
            console.log('writing...');
            resolve(data)
          }
        }  
      )}
    )
  }

  const readLogFile = function(){
    return new Promise(
      readFilePromise
    )
  };

  readLogFile().then(
    (data)=>{
      console.log('b.then- ', data)
      writeFilePromise()
    } 
  )
  .then(
    ()=>new Promise(
      readFilePromise
    )
  )
  .catch(
    (err)=>console.log('b catch errrrr', err)
  );
  console.log(readLogFile);


  
};
