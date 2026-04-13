import { useEffect } from "react";

type PageMetadata = {
  title: string;
  description: string;
};

const DESCRIPTION_META_SELECTOR = "meta[name='description']";

const usePageMetadata = ({ title, description }: PageMetadata) => {
  useEffect(() => {
    document.title = title;

    let descriptionMeta = document.querySelector<HTMLMetaElement>(
      DESCRIPTION_META_SELECTOR,
    );

    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.name = "description";
      document.head.appendChild(descriptionMeta);
    }

    descriptionMeta.content = description;
  }, [title, description]);
};

export default usePageMetadata;
