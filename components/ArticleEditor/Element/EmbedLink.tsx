import React from 'react';

interface Props {
  link: {
    url: string;
    title: string;
    description?: string | null;
    imageUrl?: string | null;
  };
  attributes: { [key: string]: unknown };
}

export const EmbedLink: React.FC<Props> = ({ link, attributes, children }) => {
  const hostname = new URL(link.url).hostname;
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <a href={link.url} className="bl_linkTool">
          <div className="bl_linkTool__content">
            <div className="bl_linkTool__title">{link.title}</div>
            {link.description && <div className="bl_linkTool_domain">{link.description}</div>}
            <div className="bl_linkTool__host">{hostname}</div>
          </div>

          {link.imageUrl && (
            <figure className="bl_linkTool__image">
              <img src={link.imageUrl} />
            </figure>
          )}
        </a>
      </div>
      {children}
    </div>
  );
};
