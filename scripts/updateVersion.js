const child_process = require('child_process');
const fs = require('fs');

const path = require('path');
const pkg = require('../package.json');

const versionInfo = child_process.execSync('npm view stream-dom-renderer versions', { encoding: 'utf-8' });
const versionList = versionInfo.split(/\'|\n|\t|\'|\[|\]|,|\s/).filter(i => !!i);

const currentVersion = pkg.version;

console.log('[Current Version]', currentVersion);
console.log('[Remote Versions]', versionInfo);

const currentVersionReleased = versionList.some(v => v === currentVersion);

if (currentVersionReleased) {
  const msg = `Current version ${currentVersion} is invalid. Please format is as X.Y.Z`;
  console.error(msg);
  throw msg
}

if (!currentVersion.match(/^[0-9]+\.[0-9]+\.[0-9]+$/)) {
  const msg = `Current version ${currentVersion} is invalid. Please format is as X.Y.Z`;
  console.error(msg);
  throw msg;
}

const configs = {
  alpha: {
    reg: /(?<=alpha\.)\d+$/,
    printName: 'Alpha',
  },
  beta: {
    reg: /(?<=beta\.)\d+$/,
    printName: 'Beta',
  },
};

const getNextVersion = (tag) => {
  let config = configs.alpha;
  if (configs[tag]) {
    config = configs[tag];
  }

  let nextVersion = 1;
  const list = versionList.map(v => v.match(config.reg)?.[0]).filter(v => !!v).map((v) => parseInt(v));
  if (list.length > 0) {
    const maxVersion = Math.max(...list);
    nextVersion = maxVersion + 1;
  }

  console.log('Tag: ', tag, config.printName, ' Version:', nextVersion);

  return `${currentVersion}-${tag}.${nextVersion}`;
};

// const alphaList = versionList.map(v => v.match(/(?<=alpha\.)\d+$/)?.[0]).filter(v => !!v).map((v) => parseInt(v));
// const betaList = versionList.map(v => v.match(/(?<=beta\.)\d+$/)?.[0]).filter(v => !!v).map((v) => parseInt(v));

// console.log('[Current Alpha List]', alphaList, '[Max Alpha Version]', Math.max(...alphaList));
// console.log('[Current Beta List]', betaList, '[Max Beta Version]', Math.max(...betaList));

// getNextVersion('beta');
// getNextVersion('alpha');

if (process.env.TAG) {
  const newVersion = getNextVersion(process.env.TAG);
  console.log('New Version', newVersion);

  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dist/package.json'), { encoding: 'utf-8' }));
  pkg.version = newVersion;

  fs.writeFileSync(
    path.resolve(__dirname, '../dist/package.json'),
    JSON.stringify(pkg),
  )

}

