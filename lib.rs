//! Deno Audio playback library with rodio.
//!
//! The main concept of this library is to play audio from Deno.
//!
//! For example, here is how you would play an audio file:
//!
//! ```typescript
//! // example.ts
//! await play("examples/music.mp3");
//! ```

use std::io::BufReader;

use deno_core::plugin_api::Interface;
use deno_core::plugin_api::Op;
use deno_core::plugin_api::ZeroCopyBuf;
use futures::future::FutureExt;

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface) {
    interface.register_op("play", op_play);
}

fn op_play(_interface: &mut dyn Interface, zero_copy: &mut [ZeroCopyBuf]) -> Op {
    let data = &zero_copy[0][..];
    let data_str = std::str::from_utf8(&data[..]).unwrap().to_string();
    let fut = async move {
        let (tx, rx) = futures::channel::oneshot::channel::<Result<(), ()>>();
        std::thread::spawn(move || {
            // call type_string
            let (_stream, handle) = rodio::OutputStream::try_default().unwrap();
            let sink = rodio::Sink::try_new(&handle).unwrap();

            let file = std::fs::File::open(&data_str).unwrap();
            sink.append(rodio::Decoder::new(BufReader::new(file)).unwrap());

            sink.sleep_until_end();
            tx.send(Ok(()));
        });
        let result_box = serde_json::to_vec(&rx.await.unwrap())
            .unwrap()
            .into_boxed_slice();
        result_box
    };

    Op::Async(fut.boxed())
}
