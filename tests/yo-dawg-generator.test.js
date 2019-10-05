import test from 'ava';
const { requestCaptions } = require('../generators/yo-dawg-generator');
const consoleReader = require('../utils/console-reader');
const sinon = require('sinon');

test('should successfully build image captions for yo-dawg meme', async t => {
	const expectedCaptions = {
		one: 'aaa',
		two: ['bbb', 'bbb'],
		three: ['ccc', 'ccc']
	};

	const questionResponse = sinon.stub()
		.onFirstCall().resolves('aaa')
		.onSecondCall().resolves('bbb,bbb')
		.onThirdCall().resolves('ccc,ccc');

	sinon.replace(consoleReader, 'question', questionResponse);

	const response = await requestCaptions();

	t.deepEqual(response, expectedCaptions);
});
