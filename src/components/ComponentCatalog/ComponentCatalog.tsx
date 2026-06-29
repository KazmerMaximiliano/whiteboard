import { useState } from "react";
import { CatalogItem } from "../CatalogItem/CatalogItem";
import { ChevronUpIcon } from "../Icon/Icon";

import { WIDGET_CATALOG } from "../../widgets/widgets.catalog";
import "./ComponentCatalog.styles.css";
import type { ComponentCatalogProps } from "./ComponentCatalog.types";

export const ComponentCatalog = ({
  defaultExpanded = false,
}: ComponentCatalogProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section
      className={`component-catalog${expanded ? " expanded" : ""}`}
      aria-label="Component catalog"
    >
      <header className="component-catalog-header">
        <button
          type="button"
          className="component-catalog-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          <span className="component-catalog-title">Component Catalog</span>
          <span
            className={`component-catalog-chevron${
              expanded ? " is-expanded" : ""
            }`}
          >
            <ChevronUpIcon />
          </span>
        </button>
      </header>
      <div className="component-catalog-body">
        {WIDGET_CATALOG.map((entry) => (
          <CatalogItem key={entry.kind} entry={entry} />
        ))}
      </div>
    </section>
  );
};
