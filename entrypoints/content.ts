export default defineContentScript({
  matches: ['*://www.mat.umk.pl/*'],
  main() {
    console.log('Jesteś na stronie UMK!');
  },
});
