export default class ClipBoard {
  static copy(text: string) {
    function listener(e: ClipboardEvent) {
      if (e.clipboardData !== null) {
        e.clipboardData.setData('text/plain', text);
      }
      e.preventDefault();
    }

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }
}
