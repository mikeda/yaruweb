import React from 'react';

interface Props {
  url: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  attributes: { [key: string]: unknown };
}

export const EmbedLink: React.FC<Props> = ({ url, title, description, imageUrl, attributes, children }) => {
  const hostname = new URL(url).hostname;
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <a href={url} className="bl_linkTool">
          <div className="bl_linkTool__content">
            <div className="bl_linkTool__title">{title}</div>
            {description && <div className="bl_linkTool_domain">{description}</div>}
            <div className="bl_linkTool__host">{hostname}</div>
          </div>

          {imageUrl && (
            <figure className="bl_linkTool__image">
              <img src={imageUrl} />
            </figure>
          )}
        </a>
      </div>
      {children}
    </div>
  );
};
