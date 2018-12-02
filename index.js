const git = require('simple-git');
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

// works
// let logz;
// let branch;
// git(path)
//   .status(
//     (err, status) =>{
//       branch = status.current;
//     // console.log(status.current);
//     })
//     .log(
//       (err, log) => {
//         // console.log('logzzz', logz);
//       logz = log;
//       const logString = JSON.stringify(logz);
//       fs.writeFile(`logz-${branch}.json`, logString, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//       });
//       }  
//     )
//     .then (
//       ()=> {
//         // console.log(logz)
//         console.log('logstttt')
        
//       }
//     )

let logz;
let branch;
git(path)
  .status(
    (err, status) =>{
      branch = status.current;
    // console.log(status.current);
  })
  .log(
    (err, log) => {
    // console.log('logzzz', logz);
    logz = log;
    const logString = JSON.stringify(logz);
    const b = fs_readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
      if (err) {
        console.log(err);       
      } else {
        console.log('received data1: ' + data);
        const a=  fs_writeFile(`logz-${branch}.json`, logString, function(err) {
          if(err) {
              console.log(err);
          } 
        })
        a.then(
          ()=>{
            const c = fs_readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
              if (!err) {
                  console.log('received data 2: ' + data);              
              } else {
                  console.log(err);
              }
            });
            c.then(
              (suc)=>{
                console.log('b suc', suc)
              },
              (error)=>{
                console.log('b error', error)
              }
            )
          }
        )
      }
    });
    console.log(b)
    b.then(  
      console.log('b then')
    )//b.then
    .catch(
      (err)=>console.log('errrrr', err)
    )
    console.log(b)

    }
  )
  .then(
    ()=>{
      console.log('then po .log')
    }
  );