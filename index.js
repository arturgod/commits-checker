const git = require('simple-git');
const gitP = require('simple-git/promise');
const fs = require('fs');
const util = require('util')
const path = './repo-tmp';
const repoUrl = 'https://github.com/arturgod/monorepo.git';
const fs_writeFile = util.promisify(fs.writeFile)
const fs_readFile = util.promisify(fs.readFile)

// works
// git()
//   .silent(false)
//   .clone(repoUrl, path)
//   .then(
//     ()=>console.log('done')
//   )
// ;

// works
// git(path)
// .checkIsRepo()
// .then(
//   isRepo => console.log(isRepo, 'hh') //!isRepo && initialiseRepo(git)
// )
// .then(
//   () => git(path).fetch()
// )
// .then(
//   () => git(path).status(
//     (err, status) =>{
//       console.log(status);
//       console.log("status");
//       git(path).pull(
//         (err, update) => {
//           console.log('update')
//           console.log(update)
//         }
//       )
//       .then(
//         () => console.log("log")
//       )
//     }
//   )
// );


let logz;
let branch;
const readFilePromise = function(){
  return new Promise(
    (resolve, reject) => {
      fs.readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
        if(err) {reject(err)}
        else {
          console.log('reading: ', data);
          resolve(data)
        }
      }  
    )}
  )
};

const writeFilePromise = function(file, content){
  return new Promise(
    (resolve, reject) => {
      fs.writeFile( file, content, function(err,data){
        if(err) {reject(err)}
        else {
          console.log('writing...');
          resolve(data)
        }
      }  
    )}
  )
}

git(path)
  .status(
    (err, status) =>{
      branch = status.current;
  })
  .log(
    (err, log) => {
      logz = JSON.stringify(log);
    }
  )
  .then(
    ()=>writeFilePromise(`logz-${branch}.json`, logz)
  );