<br />
<p align="center">
  <a href="https://github.com/littledivy/deno_audio">
    <img src="./icon.webp" alt="deno_audio logo" height="240">
  </a>
  <h3 align="center">deno_audio</h3>

  <p align="center">
    Audio playback library for Deno.
 </p>
 <p align="center">

  [![stars](https://img.shields.io/github/stars/littledivy/deno_audio)](https://github.com/divy-work/deno_audio/stargazers)
  [![issues](https://img.shields.io/github/issues/littledivy/deno_audio)](https://github.com/divy-work/deno_audio/issues)
  ![deno version](https://img.shields.io/badge/deno-1.5.1-success)
 
 </p>
</p>

<!-- TODO: will CPAL WASM really work on Deno?
> Currently published as a Deno Plugin until Rodio supports WASM. [RustAudio/rodio#313](https://github.com/RustAudio/rodio/issues/313)
--->

## Example

```typescript
import { play } from "https://deno.land/x/audio@0.1.0/mod.ts";

// supports mp3, wav, vorbis, flac
await play("music.mp3");
```

## Building from source

### Prerequisites

- [deno](https://deno.land/)
- [rust](https://www.rust-lang.org/)
- libasound2-dev - `apt-get install libasound2-dev`

## Building
```bash
$ cargo build
```

## Example

```bash
$ deno run --unstable -A example.ts
```

### Contribution

Pull request, issues and feedback are very welcome. Code style is formatted with `deno fmt` and commit messages are done following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) spec.

## Copyright

Logo by [@carazmatic](https://picsart.com/i/284157719013211) at picsart.com (cute, isn't it?)

deno_audio is licensed under the MIT license. Please see the [LICENSE](LICENSE) file.
