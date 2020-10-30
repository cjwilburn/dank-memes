import test from "ava";
const {
  processBoxData,
  getInputStrings,
} = require("../generators/butterfly-man-generator");
const consoleReader = require("../utils/console-reader");
const sinon = require("sinon");

let consoleReaderMock;

test.serial.beforeEach(() => {
  consoleReaderMock = sinon.stub(consoleReader, "question");
});

test.serial.afterEach(() => {
  consoleReaderMock.restore();
});

test.serial("getInputStrings should return default values", async (t) => {
  consoleReaderMock.onCall(0).returns("");
  consoleReaderMock.onCall(1).returns("");
  consoleReaderMock.onCall(2).returns("");

  const inputStrings = await getInputStrings();

  t.true(consoleReaderMock.calledThrice);
  t.deepEqual(inputStrings, {
    textOne: "TEACHERS",
    textTwo: "A Global Pandemic",
    textThree: "Is this a reason for more homework?",
  });
});

test.serial("getInputStrings should return supplied values", async (t) => {
  const textOne = "A Man";
  const textTwo = "A butterfly";
  const textThree = "Is this a pigeon?";
  consoleReaderMock.onCall(0).returns(textOne);
  consoleReaderMock.onCall(1).returns(textTwo);
  consoleReaderMock.onCall(2).returns(textThree);

  const inputStrings = await getInputStrings();

  t.true(consoleReaderMock.calledThrice);
  t.deepEqual(inputStrings, { textOne, textTwo, textThree });
});

test("processBoxData should format box data for request url", async (t) => {
  const testBoxData = [
    {
      text: "Test1",
    },
    {
      text: "Test2",
    },
  ];

  t.is(
    processBoxData(testBoxData),
    "boxes[0][text]=Test1&boxes[1][text]=Test2"
  );
});
