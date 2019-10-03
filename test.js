import test from 'ava';
require('./dankest-dungeon');

test('Dankest Dungeon', t => {
  t.is(memeCounter, 0);
});
