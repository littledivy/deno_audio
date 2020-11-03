import filename from "./detect.ts";
import { prepare } from "https://deno.land/x/plugin_prepare@v0.8.0/mod.ts";

const { filenameBase, pluginBase } = {
  "filenameBase": "deno_audio",
  "pluginBase":
    "https://github.com/littledivy/deno_audio/releases/latest/download",
};

const isDev = Deno.env.get("DEV");

if (isDev) {
  const rid = Deno.openPlugin("./target/debug/" + filename(filenameBase));
} else {
  // logger.info(`Downloading latest Autopilot release from Github`);
  const pluginId = await prepare({
    name: "deno_audio",
    urls: {
      darwin: `${pluginBase}/libdeno_audio.dylib`,
      windows: `${pluginBase}/deno_audio.dll`,
      linux: `${pluginBase}/libdeno_audio.so`,
    },
  });
}
