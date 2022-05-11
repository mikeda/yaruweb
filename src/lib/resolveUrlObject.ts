import { UrlObject } from 'url';

import { resolveHref } from 'next/dist/shared/lib/router/router';
import { NextRouter } from 'next/router';

export const resolveUrlObject = (router: NextRouter, urlObject: UrlObject) => {
  return resolveHref(router, urlObject, true)[1] as string;
};
