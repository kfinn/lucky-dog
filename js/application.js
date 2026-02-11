import camelize from "camelize";
import { html } from "htm/react";
import { createRoot } from "react-dom/client";
import { onDocumentReady } from "utils";

const COMPONENT_IMPORT_PATHS = {
  AnimatedBackground: "components/animated-background",
};

onDocumentReady(() => {
  document
    .querySelectorAll("[data-react-component-name]")
    .forEach((element) => {
      const componentImportPath =
        COMPONENT_IMPORT_PATHS[
          element.getAttribute("data-react-component-name")
        ];
      import(componentImportPath)
        .then(({ default: Component }) => {
          const root = createRoot(element);
          if (element.hasAttribute("data-react-component-props")) {
            const snakeCaseProps = JSON.parse(
              element.getAttribute("data-react-component-props"),
            );
            const props = camelize(snakeCaseProps);
            root.render(html`<${Component} ...${props} />`);
          } else {
            root.render(html`<${Component} />`);
          }
        })
        .catch((error) => console.error(error));
    });
});
