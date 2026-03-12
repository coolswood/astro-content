import fs from 'fs';
import path from 'path';

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, files);
    } else if (filePath.endsWith('.json')) {
      files.push(filePath);
    }
  }
  return files;
}

function getType(val) {
  if (Array.isArray(val)) return 'array';
  if (val === null) return 'null';
  return typeof val;
}

function compareStructure(obj1, obj2, currentPath = '') {
  const type1 = getType(obj1);
  const type2 = getType(obj2);

  if (type1 !== type2) {
    return [
      { path: currentPath, msg: `Type mismatch: old=${type1}, new=${type2}` },
    ];
  }

  const errors = [];

  if (type1 === 'object') {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    const keys1Str = keys1.join(',');
    const keys2Str = keys2.join(',');

    if (keys1Str !== keys2Str) {
      const missingIn2 = keys1.filter((k) => !keys2.includes(k));
      const missingIn1 = keys2.filter((k) => !keys1.includes(k));
      if (missingIn2.length > 0)
        errors.push({
          path: currentPath,
          msg: `Missing keys in new: ${missingIn2.join(', ')}`,
        });
      if (missingIn1.length > 0)
        errors.push({
          path: currentPath,
          msg: `Extra keys in new: ${missingIn1.join(', ')}`,
        });
    }

    for (const key of keys1) {
      if (keys2.includes(key)) {
        const nestedErrors = compareStructure(
          obj1[key],
          obj2[key],
          `${currentPath}.${key}`,
        );
        errors.push(...nestedErrors);
      }
    }
  } else if (type1 === 'array') {
    if (obj1.length !== obj2.length) {
      errors.push({
        path: currentPath,
        msg: `Array length mismatch: old=${obj1.length}, new=${obj2.length}`,
      });
    }
    const len = Math.min(obj1.length, obj2.length);
    for (let i = 0; i < len; i++) {
      const nestedErrors = compareStructure(
        obj1[i],
        obj2[i],
        `${currentPath}[${i}]`,
      );
      errors.push(...nestedErrors);
    }
  }

  return errors;
}

function main() {
  const oldDir = 'dist-old/api/mindhealth/pt_br';
  const newDir = 'dist/api/mindhealth/pt_br';

  const oldFiles = getFiles(oldDir).map((f) => path.relative(oldDir, f));
  const newFiles = getFiles(newDir).map((f) => path.relative(newDir, f));

  let hasErrors = false;

  for (const file of oldFiles) {
    if (!newFiles.includes(file)) {
      console.error(`File missing in new dist: ${file}`);
      hasErrors = true;
      continue;
    }

    const oldContent = JSON.parse(
      fs.readFileSync(path.join(oldDir, file), 'utf8'),
    );
    const newContent = JSON.parse(
      fs.readFileSync(path.join(newDir, file), 'utf8'),
    );

    const errors = compareStructure(oldContent, newContent, file);
    if (errors.length > 0) {
      hasErrors = true;
      console.error(`--- Differences in ${file} ---`);
      for (const err of errors) {
        console.error(`  ${err.path}: ${err.msg}`);
      }
    }
  }

  for (const file of newFiles) {
    if (!oldFiles.includes(file)) {
      console.error(`Extra file in new dist: ${file}`);
      hasErrors = true;
    }
  }

  if (!hasErrors) {
    console.log('Success: All files have identical structure!');
  } else {
    process.exit(1);
  }
}

main();
