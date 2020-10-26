const fs = require("fs");
const path = require("path");
const jsDir = "./js/";

function Build()
{
    console.log("Building app.ts...");
    
    // Go through each file within the js directory and concatenate them into one file named "app.ts".
    const writeStream = fs.createWriteStream(path.join(jsDir, "app.ts"));

    writeStream.on("close", () =>
    {
        console.log("Finished building app.ts!");
    });

    writeStream.on("ready", () =>
    {
        fs.readdirSync(jsDir).forEach(file =>
        {
            writeStream.write(fs.readFileSync(path.join(jsDir, file), "utf-8") + "\r\n", "utf-8");
        });

        writeStream.close();
    });
}

Build();