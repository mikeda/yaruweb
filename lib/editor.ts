/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import Header from '@editorjs/header';
//@ts-ignore
import List from '@editorjs/list';
//@ts-ignore
import Embed from '@editorjs/embed';
//@ts-ignore
import ImageTool from '@editorjs/image';
//@ts-ignore
import LinkTool from '@editorjs/link';
//@ts-ignore
import { MyParagraph } from '@/components/editor/MyParagraph.js';
import { Move } from '@/components/editor/Move/Move';

export const editorTools = {
  paragraph: {
    class: MyParagraph as any,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: 'Enter a header',
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDOPOINT}/article_link`,
    },
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        twitter: true,
        'twitch-video': true,
        'twitch-channel': true,
      },
    },
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDOPOINT}/article_images`,
        byUrl: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDOPOINT}/me/api/article_images`,
      },
    },
  },
  move: {
    class: Move as any,
  },
};
