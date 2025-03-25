export type CookieOptions = {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
};

export const cookieOptions: CookieOptions = {
    expires: 7,
    path: '/',
    secure: true,
    sameSite: 'Strict'
};


export const parseCookies = (): Record<string, string> => {
    return document.cookie.split(';').reduce((acc: Record<string, string>, cookie) => {
        const [key, ...parts] = cookie.split('=');
        const value = parts.join('=').trim();
        acc[key.trim()] = decodeURIComponent(value);
        return acc;
    }, {});
};

export const getCookie = (name: string): string | null => {
    const cookies = parseCookies();
    return cookies[name] || null;
};

export const setCookie = (
    name: string,
    value: string,
    options: CookieOptions = {}
): void => {
    const cookieSettings: string[] = [];
    const encodedValue = encodeURIComponent(value);

    if (options.expires) {
        const expiresDate = options.expires instanceof Date
            ? options.expires
            : new Date(Date.now() + options.expires * 864e5);
        cookieSettings.push(`expires=${expiresDate.toUTCString()}`);
    }

    if (options.path) cookieSettings.push(`path=${options.path}`);
    if (options.domain) cookieSettings.push(`domain=${options.domain}`);
    if (options.secure) cookieSettings.push('secure');
    if (options.sameSite) cookieSettings.push(`samesite=${options.sameSite}`);

    document.cookie = `${name}=${encodedValue}; ${cookieSettings.join('; ')}`;
};

export const removeCookie = (name: string, path?: string): void => {
    document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; path=${path || '/'}`;
};