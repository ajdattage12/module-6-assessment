const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
   test('test to ensure shuffleArray is an array', () => {
       const array = shuffleArray([1, 2]);
       expect(Array.isArray(array)).toBeTruthy();
   })

   test('test to confirm returned array is same length as shuffleArray', () => {
       const original = [1, 2, 3, 4];
       const shuffled = shuffleArray(original);
       expect(shuffled.length).toEqual(original.length);
   })

})
