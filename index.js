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
const logSince = '2018-11-30';
const readFilePromise = function(file){
  return new Promise(
    (resolve, reject) => {
      fs.readFile(file, {encoding: 'utf-8'}, function(err,data){
        if(err) {reject(err)}
        else {
          console.log('read: ', data);
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
    {'--since': logSince},
    (err, log) => {
      logz = JSON.stringify(log);
    }
  )
  //that 'then' below is method of git(), i doubt it returns a promise coz it doesn't have 'catch'
  .then(
    ()=>writeFilePromise(`logz-${branch}.json`, logz)
  )
  .then(
    (data)=>readFilePromise(`logz-${branch}.json`)
  );