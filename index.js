const git = require('simple-git');
const fs = require('fs');
const util = require('util')
const path = './repo-tmp';
const repoUrl = 'https://github.com/arturgod/monorepo.git';
const fs_writeFile = util.promisify(fs.writeFile)
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
      const b = fs.readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data1: ' + data);
            
        } else {
            console.log(err);
        }
        const a=  fs_writeFile(`logz-${branch}.json`, logString, function(err) {
        if(err) {
            console.log(err);
        } 
        a.then(
          ()=>{
            const b = fs.readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
              if (!err) {
                  console.log('received data 2: ' + data);
                  
              } else {
                  console.log(err);
              }
            })
          }
        )
      });
      })
      
      
      }  
    )
    .then (
      ()=> {
        // console.log(logz)
        console.log('logstttt')
        const b = fs.readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err, data){
          console.log('data;;;')
          console.log(data)
          ////"aaaa":"ssssssss",
        })
        
      }
    )
