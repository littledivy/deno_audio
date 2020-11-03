import filename from "./detect.ts";
import { prepare } from "https://deno.land/x/plugin_prepare@v0.8.0/mod.ts";
import { core } from "./core_type.ts";

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


const {
    play: op_play,
} = core.ops();
  
const textDecoder = new TextDecoder();
const decoder = new TextDecoder();


export async function play(file: string) {
    const encoder = new TextEncoder();
    const view = encoder.encode(file);
    return new Promise((resolve, reject) => {
      core.setAsyncHandler(op_play, (bytes) => {
        resolve(textDecoder.decode(bytes));
      });
      core.dispatch(op_play, view);
    });
}
