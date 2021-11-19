const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
   test('test ensures shuffleArray is an array', () => {
       const testArray = shuffleArray([1, 2, 3, 4, 5]);
       expect(Array.isArray(testArray)).toBeTruthy();
   });

   test('test to confirm returned array is same length as shuffleArray', () => {
       const originalArray = [1, 2, 3, 4];
       const shuffled = shuffleArray(originalArray);
       expect(shuffled.length).toEqual(originalArray.length);
   });

   test('test to confrim both array contain the same information', () => {
        const testArray = [1, 2, 3, 4];
        const result = shuffleArray(testArray)
        expect(result).toEqual(expect.arrayContaining(testArray));
   });

   test('tes to confirm that items have been shuffled', () => {
       const dummyArray = [1, 2, 3, 4];
       const result = shuffleArray(dummyArray);
       expect(result.join()).not.toEqual(dummyArray.join);
   });
});
