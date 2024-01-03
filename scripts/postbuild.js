const fs = require('fs');
const path = require('path');

fs.copyFileSync(path.resolve(__dirname, '../README.md'), path.resolve(__dirname, '../dist/README.md'));

const pkgs = fs.readFileSync(path.resolve(__dirname, '../package.json'), { encoding: 'utf-8' });
const pkg = JSON.parse(pkgs);

const list = [
  'name',
  'version',
  'author',
  'main',
  'module',
  'repository',
  'keywords',
  'bugs',
  'license',
  'peerDependencies'
];

const newPkg = {};

list.forEach((k) => {
  if (pkg[k]) {
    newPkg[k] = pkg[k];
  }
});

fs.writeFileSync(
  path.resolve(__dirname, '../dist/package.json'),
  JSON.stringify(newPkg),
)

