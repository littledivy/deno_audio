import "./plugin.ts";
import { core } from "./core_type.ts";

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
