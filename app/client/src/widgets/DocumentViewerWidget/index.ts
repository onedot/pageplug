import { ResponsiveBehavior } from "utils/autoLayout/constants";
import IconSVG from "./icon.svg";
import Widget from "./widget";
import { isAirgapped } from "@appsmith/utils/airgapHelpers";
import { WIDGET_TAGS } from "constants/WidgetConstants";

const isAirgappedInstance = isAirgapped();

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "文档阅读器", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
  iconSVG: IconSVG,
  tags: [WIDGET_TAGS.DISPLAY],
  needsMeta: false, // Defines if this widget adds any meta properties
  isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
  searchTags: ["pdf", "document viewer"],
  defaults: {
    widgetName: "DocumentViewer",
    docUrl: !isAirgappedInstance
      ? "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf"
      : "",
    rows: 40,
    columns: 24,
    version: 1,
    animateLoading: false,
    responsiveBehavior: ResponsiveBehavior.Fill,
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
    contentConfig: Widget.getPropertyPaneContentConfig(),
    setterConfig: Widget.getSetterConfig(),
    autocompleteDefinitions: Widget.getAutocompleteDefinitions(),
  },
  autoLayout: {
    widgetSize: [
      {
        viewportMinWidth: 0,
        configuration: () => {
          return {
            minWidth: "280px",
            minHeight: "280px",
          };
        },
      },
    ],
  },
};

export default Widget;
