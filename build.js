const fs = require("fs");
const path = require("path");
const process = require("process");

const tsDir = "./ts/";
const appFile = path.join(tsDir, "app.ts");
const configFile = path.join(tsDir, "config/config.json");

function Build()
{
    console.log("Building app.ts...");
    
    // Go through each file within the ts directory and concatenate them into one file named "app.ts".
    const writeStream = fs.createWriteStream(appFile);

    writeStream.on("close", () =>
    {
        console.log("Finished building app.ts!");
    });

    writeStream.on("ready", () =>
    {
        fs.readdirSync(tsDir).forEach(file =>
        {
            // Don't include these files.
            if (file !== "app.ts" && file !== "config")
            {
                writeStream.write(
                    fs.readFileSync(path.join(tsDir, file), "utf-8") + "\r\n\r\n",
                    "utf-8"
                );
            }
        });

        // Write the config.json file as a global constant.
        writeStream.write("class C { public static CONFIG_FILE_CONTENTS = `", "utf-8");
        writeStream.write(fs.readFileSync(configFile, "utf-8"), "utf-8");
        writeStream.write("`;}\r\n\r\n", "utf-8");
        writeStream.write("Chatbot.GetInstance(); // Start the Chatbot app!", "utf-8");

        writeStream.close();
    });
}

Build();