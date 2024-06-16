export default defineContentScript({
  matches: ['*://*.mat.umk.pl/*'],
  main() {
    console.log('Jesteś na stronie UMK!');
  },
});
