import { assert } from 'chai';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-four-card-mocha-chai-assert/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a number type of each card list image width and height attribute values', () => {
		const cardImageElements = document.querySelectorAll('.card__image img');

		for (let i = 0; i < cardImageElements.length; i++) {
			const cardImageEl = cardImageElements[i];
			const cardImageWidth = cardImageEl.width;
			const cardImageHeight = cardImageEl.height;

			assert.typeOf(cardImageWidth, 'number');
			assert.typeOf(cardImageHeight, 'number');
		}
	});

	it("should have a title element that contains 'Reliable, efficient delivery' word", () => {
		const sectionTitleEl = document.querySelector('.section__title');
		const sectionTitle = sectionTitleEl.textContent.trim();

		assert.equal(sectionTitle, 'Reliable, efficient delivery');
	});

	it('should have two children inside of the section element', () => {
		const sectionEl = document.querySelector('section');
		const sectionChildrenElements = sectionEl.children;

		assert.lengthOf(sectionChildrenElements, 2);
	});

	it('should have an empty alt attribute value of each card list item image element', () => {
		const cardItemImageElements =
			document.querySelectorAll('.card__image img');

		for (let i = 0; i < cardItemImageElements.length; i++) {
			const cardItemImageAlt = cardItemImageElements[i].alt;

			assert.isEmpty(cardItemImageAlt);
		}
	});
});
