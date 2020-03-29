export default class ClipBoard {
  static copy(text) {
    function listener(e) {
      e.clipboardData.setData('text/plain', text);
      e.preventDefault();
    }

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }
}
