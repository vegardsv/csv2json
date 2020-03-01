const fs = require("fs");

process({
  infile: "./MOCK_DATA.csv",
  outfile: "output.json",
  delimiter: ",",
  pretty: true
});

function process({ infile, outfile, delimiter, pretty }) {
  fs.readFile(infile, "utf8", (err, input) => {
    const lines = input.split("\n");
    const headers = lines[0].split(delimiter);
    const output = lines
      .filter((_, i) => i !== 0)
      .map((line, i) => {
        values = line.split(delimiter);
        return "{"
          .concat(values.map((value, i) => `"${headers[i]}":"${value}"`))
          .concat("}");
      });
    fs.writeFile(
      outfile,
      pretty ? format("[" + output + "]") : "[" + output + "]",
      "utf8",
      () => {
        console.log("Job finished");
      }
    );
  });
}

function format(input) {
  return JSON.stringify(JSON.parse(input), null, 2);
}
