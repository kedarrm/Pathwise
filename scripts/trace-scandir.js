const fs = require('fs');
const path = require('path');

function shouldLog(p) {
  if (!p) return false;
  try {
    const np = path.normalize(String(p)).toLowerCase();
    return np.includes(path.normalize('C:\\Users\\Kedar').toLowerCase());
  } catch (e) {
    return false;
  }
}

// Patch async and sync readdir, scandir, opendir and promise variants
const origReaddir = fs.readdir;
const origReaddirSync = fs.readdirSync;
const origScandir = fs.scandir ? fs.scandir : null;
const origOpendir = fs.opendir ? fs.opendir : null;
const origOpendirSync = fs.opendirSync ? fs.opendirSync : null;

fs.readdir = function (p, ...args) {
  if (shouldLog(p)) {
    console.error('\nFS.readdir called for', p);
    console.error(new Error().stack);
  }
  return origReaddir.call(this, p, ...args);
};

fs.readdirSync = function (p, ...args) {
  if (shouldLog(p)) {
    console.error('\nFS.readdirSync called for', p);
    console.error(new Error().stack);
  }
  return origReaddirSync.call(this, p, ...args);
};

if (origScandir) {
  fs.scandir = function (p, ...args) {
    if (shouldLog(p)) {
      console.error('\nFS.scandir called for', p);
      console.error(new Error().stack);
    }
    return origScandir.call(this, p, ...args);
  };
}

if (origOpendir) {
  fs.opendir = function (p, ...args) {
    if (shouldLog(p)) {
      console.error('\nFS.opendir called for', p);
      console.error(new Error().stack);
    }
    return origOpendir.call(this, p, ...args);
  };
}

if (origOpendirSync) {
  fs.opendirSync = function (p, ...args) {
    if (shouldLog(p)) {
      console.error('\nFS.opendirSync called for', p);
      console.error(new Error().stack);
    }
    return origOpendirSync.call(this, p, ...args);
  };
}

if (fs.promises) {
  const origPromisesReaddir = fs.promises.readdir;
  fs.promises.readdir = function (p, ...args) {
    if (shouldLog(p)) {
      console.error('\nFS.promises.readdir called for', p);
      console.error(new Error().stack);
    }
    return origPromisesReaddir.call(this, p, ...args);
  };
}

// Run Next CLI programmatically
(async () => {
  try {
    // require next's CLI script
    require('next/dist/bin/next');
  } catch (err) {
    console.error('Error running next:', err);
    process.exit(1);
  }
})();
