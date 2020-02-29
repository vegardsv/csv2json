const fs = require("fs");
const readline = require("readline");

function printObject(keyValuePairs) {
  return keyValuePairs
    .reduce(
      (acc, cur, idx) =>
        acc.concat(
          `"${cur[0]}":"${cur[1]}"${
            idx !== keyValuePairs.length - 1 ? "," : ""
          }`
        ),
      "{"
    )
    .concat("},");
}

function toPairs(xs1, xs2) {
  return xs1.map((x, i) => [x, xs2[i]]);
}

async function process({ input, outfile, delimiter, pretty }) {
  let output = "";
  const fileStream = fs.createReadStream(input);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let headers = undefined;
  for await (const line of rl) {
    if (!headers) {
      headers = line.split(delimiter);
    } else {
      let values = line.split(delimiter);
      output += printObject(toPairs(headers, values));
    }
  }
  output = output.substring(0, output.length - 1);
  fs.writeFile(
    outfile,
    pretty
      ? JSON.stringify(JSON.parse("[" + output + "]"), null, 2)
      : "[" + output + "]",
    "utf8",
    () => {
      console.log("Job finished");
    }
  );
}

process({
  input: "./MOCK_DATA.csv",
  outfile: "output.json",
  delimiter: ",",
  pretty: true
});
