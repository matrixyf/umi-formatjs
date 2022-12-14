/*
 * @Author: Hong.Zhang
 * @Date: 2022-08-24 16:46:01
 * @Description: 
 */
import { writeFileSync } from "fs";
import { writeFile } from "fs/promises";

export async function writeTMSSync(tmsFile: string) {
  await writeFileSync(tmsFile, `
// mapping comes from index.json.
// msgs comes from the extracting tsx/jsx files of src/**/*.ts*/js*

let mapping = {};
try {
  mapping = require('./index.json');
} catch (e) {
  mapping = {};
}

exports.format = function (msgs) {
  const results = {};
  for (const [id, msg] of Object.entries(msgs)) {
    const { defaultMessage } = msg;
    if (mapping[id]) {
      results[id] = mapping[id];
    } else {
      results[id] = defaultMessage || id;
    }
  }
  return results;
};
`);
}

export async function writeTsExportSync(txExportFile: string, country: string) {
  await writeFileSync(txExportFile, `
const msgs = require('./${country}/index.json');
export default msgs;
`);
}

export function stringFormat(template: string, ...args: any[]) {
  return template.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined'
          ? args[number]
          : match
          ;
  });
};