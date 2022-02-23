// Auto-generated with deno_bindgen
import { CachePolicy, prepare } from "https://deno.land/x/plug@0.5.1/plug.ts";
function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v;
  return new TextEncoder().encode(v);
}
function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v);
}
function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v as Deno.UnsafePointer);
  const lengthBe = new Uint8Array(4);
  const view = new DataView(lengthBe.buffer);
  ptr.copyInto(lengthBe, 0);
  const buf = new Uint8Array(view.getUint32(0));
  ptr.copyInto(buf, 4);
  return buf;
}
const opts = {
  name: "deno_audio",
  url: (new URL("../target/release", import.meta.url)).toString(),
  policy: undefined,
};
const _lib = await prepare(opts, {
  play: { parameters: ["pointer", "usize"], result: "void", nonblocking: true },
});

export function play(a0: string) {
  const a0_buf = encode(a0);
  let rawResult = _lib.symbols.play(a0_buf, a0_buf.byteLength);
  const result = rawResult;
  return result;
}
