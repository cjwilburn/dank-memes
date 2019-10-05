import test from 'ava';
const { requestCaptions } = require('../yo-dawg/yo-dawg');
const consoleReader = require('../utils/console-reader');

const sinon = require('sinon');

test('foo', t => {
	t.pass();
});

const testObj = {
	testPromise: async () => {
		return await Promise.resolve(123);
	}
}

test('bar', async t => {
	const bar = Promise.resolve('bar');
	t.is(await bar, 'bar');

	const questionResponse = sinon.stub(consoleReader, 'question')
		.onFirstCall().yields((a) => Promise.resolve(123))
		.onSecondCall().yields((a) => Promise.resolve(123))
		.onThirdCall().yields((a) => Promise.resolve(123));

	console.log('wow');
	requestCaptions();
});