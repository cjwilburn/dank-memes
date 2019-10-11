import test from 'ava';
import roulette from './roulette.js';

test('Meme Roulette', async t => {
  // let meme = roulette.memeRoulette();
  let meme = await roulette.memeRoulette();
  t.is(await meme, "");
})
