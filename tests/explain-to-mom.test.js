import test from "ava";
import sinon from "sinon";
const consoleReader = require("../utils/console-reader");

import { getInputStrings } from "../explain-to-mom";

let consoleReaderMock;

test.beforeEach(() => {
  consoleReaderMock = sinon.stub(consoleReader, "question");
});

test.afterEach(() => {
  consoleReaderMock.restore();
});

test.serial("getInputStrings should return default values", async t => {
  consoleReaderMock.onCall(0).returns('');
  consoleReaderMock.onCall(1).returns('');

  const inputStrings = await getInputStrings();

  t.true(consoleReaderMock.calledTwice);
  t.deepEqual(inputStrings, { topText: 'Me explaining something', bottomText: 'My mom' });

});

test.serial("getInputStrings should return supplied values", async t => {
  const topText = 'Me telling my cat to get off the computer';
  const bottomText = 'My Cat';
  consoleReaderMock.onCall(0).returns(topText);
  consoleReaderMock.onCall(1).returns(bottomText);

  const inputStrings = await getInputStrings();

  t.true(consoleReaderMock.calledTwice);
  t.deepEqual(inputStrings, { topText, bottomText });
});
