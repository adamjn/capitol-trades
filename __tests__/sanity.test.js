
describe('Environment Sanity Check', () => {
    test('Jest should be working', () => {
        expect(true).toBe(true);
    });

    test('DOM should be mockable (JSDOM)', () => {
        document.body.innerHTML = '<div id="test">Hello</div>';
        const el = document.getElementById('test');
        expect(el.innerHTML).toBe('Hello');
    });
});
