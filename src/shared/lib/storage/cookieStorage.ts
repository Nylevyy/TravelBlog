import { Storage } from './types';

export class CookieStorage implements Storage {
  private storage = document.cookie;

  public add(
    key: string,
    value: string,
    additionalOptions?: Partial<
      Record<
        | 'max-age'
        | 'expires'
        | 'secure'
        | 'domain'
        | 'path'
        | 'samesite'
        | 'httpOnly',
        string | boolean | number | Date
      >
    >,
  ) {
    const options = {
      path: '/',
      ...additionalOptions,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    Object.entries(options).reduce(
      (acc, [opt, val]) => {
        const result = `${acc}; ${opt}`;
        if (val === true) {
          return result;
        }

        return `${result}=${val}`;
      },
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    );

    this.storage = `${key}=${value}`;
  }

  public get(key: string): string | null {
    const matches = this.storage.match(
      new RegExp(
        `(?:^|; )${key.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
      ),
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  public remove(key: string): void {
    this.add(key, '', { 'max-age': -1 });
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  public clear(): void {
    this.storage.split(';').forEach((cookie) => {
      document.cookie =
        `${cookie.trim().split('=')[0]}=;` +
        `expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    });
  }
}
