import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export class MarkdownOptions implements MarkedOptions {
  readonly renderer: MarkedRenderer;
  constructor() {
    this.renderer = new MarkedRenderer();
    this.renderer.link = (href: string | null, title: string | null, text: string) => `<a href="${href}" title="${title ?? text}" target="_blank">${text}</a>`;
  }
}
