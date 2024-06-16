export default defineBackground(() => {
  console.log('BOMB background', { id: browser.runtime.id });
});
