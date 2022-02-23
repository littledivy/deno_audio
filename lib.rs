//! Deno Audio playback library with rodio.
//!
//! The main purpose of this library is to play audio from Deno.
//!
//! For example, here is how you would play an audio file:
//!
//! ```typescript
//! // example.ts
//! await play("examples/music.mp3");
//! ```

use deno_bindgen::deno_bindgen;
use std::io::BufReader;

#[deno_bindgen(non_blocking)]
pub fn play(filename: &str) {
    let (_stream, handle) = rodio::OutputStream::try_default().unwrap();
    let sink = rodio::Sink::try_new(&handle).unwrap();

    let file = std::fs::File::open(&filename).unwrap();
    sink.append(rodio::Decoder::new(BufReader::new(file)).unwrap());
    // `play` runs from a different thread.
    sink.sleep_until_end();
}
