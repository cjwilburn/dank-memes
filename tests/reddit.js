import test from "ava";

import { getList, createMemeList } from "../reddit";


const fakeBody = {
  data: {
    children: [
      { data: { preview: { images: [ { source: { url: 'wat' } } ] }, over_18: false } },
      { data: { preview: { images: [ { source: { url: 'baz' } } ] }, over_18: true } }
    ]
  }
};

test("test reddit.js > getList() is running", async t => {
  t.is(getList(), true);
});

test("test reddit.js > createMemeList() returns false early if no body provided", async t => {
  t.is(createMemeList(), false);
});

test("test reddit.js > createMemeList() returns true when data is provided", async t => {
  t.is(
    createMemeList(fakeBody, 2),
    true
  );
});
