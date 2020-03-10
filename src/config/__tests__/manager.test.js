import { set, get } from '../manager'

describe('setGet', () => {
    it('retains values when set', () => {
        const name = `key-${Math.random()}`;
        const value = `value-${Math.random()}`;

        expect(get(name)).toBeNull();
        set(name, value)
        expect(get(name)).toEqual(value);
    });
});
