import React from 'react';

type OutputData = {
  link: string;
  meta: {
    title: string;
    site_name: string;
    description: string;
    image: {
      url: string;
    };
  };
};

interface Props {
  data: OutputData;
}

export const LinkToolOutput: React.FC<Props> = ({ data }) => {
  const hostname = new URL(data.link).hostname;

  return (
    <a href={data.link} className="bl_linkTool">
      <div className="bl_linkTool__content">
        <div className="bl_linkTool__title">{data.meta.title}</div>
        {data.meta.description && <div className="bl_linkTool_domain">{data.meta.description}</div>}
        <div className="bl_linkTool__host">{hostname}</div>
      </div>

      {data.meta.image.url && (
        <figure className="bl_linkTool__image">
          <img src={data.meta.image.url} />
        </figure>
      )}
    </a>
  );
};
