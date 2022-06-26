import {hash, hash_compare} from '../../../src/utils/hashing';

describe('Hashing Utils test', () => { 
    describe("hash test",() => {
        it('Should give expected hash result', () => {
            const input = 'chala';
            const exptected_output = 'n/3qtKR9odwa01MOfTx6yQMYt3mmJF6B+qSTAMbZgzo='
            expect(hash(input)).toBe(exptected_output);
      
        });

        it('Should return empty for empty string', () => {
            const input = "";
            const exptected_output = "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=";
            expect(hash(input)).toBe(exptected_output);
      
        });
    });

    describe("hash compare test",() => {
        it('Should return true if two hashed values are the same', () => {
            const input = 'n/3qtKR9odwa01MOfTx6yQMYt3mmJF6B+qSTAMbZgzo=';
            const input_2 = 'n/3qtKR9odwa01MOfTx6yQMYt3mmJF6B+qSTAMbZgzo=';
            expect(hash_compare(input,input_2)).toBe(true);
      
          });

        it('Should return false if two hashed value are not the same', () => {
            const input = 'n/3qtKR9odwa01MOfTx6yQMYt3mF6B+qSTAMbZgzo='
            const input_2 = 'n/3qtKR9odwa01MOfTx6yQMYt3mmJF6B+qSTAMbZgzo='
            expect(hash_compare(input,input_2)).toBe(false);
          });
    });
});