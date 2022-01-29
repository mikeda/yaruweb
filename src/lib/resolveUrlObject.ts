import { resolveHref } from 'next/dist/shared/lib/router/router';
import { NextRouter } from 'next/router';
import { UrlObject } from 'url';

export const resolveUrlObject = (router: NextRouter, urlObject: UrlObject) => {
  return resolveHref(router, urlObject, true)[1];
};
