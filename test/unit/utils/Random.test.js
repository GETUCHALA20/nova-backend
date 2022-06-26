import Random from '../../../src/utils/Random';

describe('Random Utils test', () => { 
    test('should throw Error with message when negative values were passed', () => {
        const input = -6 ;
        expect(()=>{Random(input)}).toThrow(TypeError);
    });
});