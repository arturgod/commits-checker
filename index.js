const git = require('simple-git');
const gitP = require('simple-git/promise');
const fs = require('fs');
const util = require('util')

const PATH = './repo-tmp';
const REPO_URL = 'https://github.com/arturgod/monorepo.git';
const LOG_SINCE = '2018-11-30';

// gitClone(REPO_URL, PATH);
repoUpdate(PATH);
// getCommits(LOG_SINCE, PATH);

// works
function gitClone(repo, repoPath){
  git()
    .silent(false)
    .clone(repo, repoPath)
    .then(
      ()=>console.log('repo cloned')
    )
};

// works
function repoUpdate (path){
  gitP(path)
  .checkIsRepo()
  .then(
    isRepo => console.log('isRepo:', isRepo)
  )
  .then(
    () => gitP(path).fetch()
  )
  .then(
    () => gitP(path).status(
      (err, status) =>{
        console.log("status:", status);
        git(path).pull(
          (err, update) => {
            console.log('update:', update)
          }
        )
      }
    )
  );
}

function getCommits(logSince, path){
  let logz;
  let branch;

  const readFilePromise = function(file){
    return new Promise(
      (resolve, reject) => {
        fs.readFile(file, {encoding: 'utf-8'}, function(err,data){
          if(err) {reject(err)}
          else {
            console.log('commits saved: ', data);
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
  };

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
    //that 'then' below is method of git()
    .then(
      ()=>writeFilePromise(`logz-${branch}.json`, logz)
    )
    .then(
      ()=>readFilePromise(`logz-${branch}.json`)
    );
};