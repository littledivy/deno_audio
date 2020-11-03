import filename from "./detect.ts";
import { prepare } from "https://deno.land/x/plugin_prepare@v0.8.0/mod.ts";

// @ts-ignore
export const core = Deno.core as {
    ops: () => { [key: string]: number };
    setAsyncHandler(rid: number, handler: (response: Uint8Array) => void): void;
    dispatch(
      rid: number,
      msg?: any,
      buf?: ArrayBufferView,
    ): Uint8Array | undefined;
  };

const { filenameBase, pluginBase } = {
  "filenameBase": "deno_audio",
  "pluginBase":
    "https://github.com/littledivy/deno_audio/releases/latest/download",
};

const isDev = Deno.env.get("DEV");

if (isDev) {
  // This will be checked against open resources after Plugin.close()
  // in runTestClose() below.
  const resourcesPre = Deno.resources();

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
    play,
} = core.ops();
  
const textDecoder = new TextDecoder();
const decoder = new TextDecoder();


export async function play_audio(arg: string) {
    const encoder = new TextEncoder();
    const view = encoder.encode(arg);
    return new Promise((resolve, reject) => {
      core.setAsyncHandler(play, (bytes) => {
        resolve(textDecoder.decode(bytes));
      });
      core.dispatch(play, view);
    });
}

await play_audio("music.mp3");

