const git = require('simple-git');
const fs = require('fs');
const util = require('util')
const path = './repo-tmp';
const repoUrl = 'https://github.com/arturgod/monorepo.git';
const fs_writeFile = util.promisify(fs.writeFile)
const fs_readFile = util.promisify(fs.readFile)

main();

function main(){
  const content = '2222';
  const b = fs_readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
    if (err) {
      console.log(err);       
    } else {
      console.log('received data b: ' + data);
      const a=  fs_writeFile(`logz-master.json`, content, function(err) {
        if(err) { console.log(err); } 
      })
      a.then(
        ()=>{
          const c = fs_readFile(`logz-master.json`, {encoding: 'utf-8'}, function(err,data){
            if (!err) { console.log('received data 2: ' + data);}
            else { console.log(err);}
            return data;
          });
          console.log('c', c)
          c.then(
            ()=> console.log('c suc') ,
            (error)=>{ console.log('c error', error)}
          )
        }
      )
      .then(
        ()=>console.log('uuuu')
      )
    }
  });
  b.then(  
    ()=>console.log('b.then')
  )//b.then
  b.catch(
    (err)=>console.log('b catch errrrr', err)
  )
  console.log(b)
}