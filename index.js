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
      .map(line => {
        values = line.split(delimiter);
        return (
          "{" + values.map((value, i) => `"${headers[i]}":"${value}"`) + "}"
        );
      });
    fs.writeFile(outfile, format(pretty, `[${output}]`), "utf8", () => {
      console.log("Job finished");
    });
  });
}

const format = (pretty, input) =>
  pretty ? JSON.stringify(JSON.parse(input), null, 2) : input;
