import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "utils/autoLayout/constants";
import { dataSetForWorld, MapTypes } from "./constants";
import IconSVG from "./icon.svg";
import Widget from "./widget";
import { WIDGET_TAGS } from "constants/WidgetConstants";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "地图图表", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
  iconSVG: IconSVG,
  tags: [WIDGET_TAGS.DISPLAY],
  needsMeta: true, // Defines if this widget adds any meta properties
  isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
  searchTags: ["graph", "visuals", "visualisations", "map chart"],
  defaults: {
    rows: 32,
    columns: 24,
    widgetName: "MapChart",
    version: 1,
    mapType: MapTypes.WORLD,
    mapTitle: "Global Population",
    showLabels: true,
    data: dataSetForWorld,
    colorRange: [
      {
        minValue: 0.5,
        maxValue: 1.0,
        code: "#FFD74D",
      },
      {
        minValue: 1.0,
        maxValue: 2.0,
        code: "#FB8C00",
      },
      {
        minValue: 2.0,
        maxValue: 3.0,
        code: "#E65100",
      },
    ],
    responsiveBehavior: ResponsiveBehavior.Fill,
    minWidth: FILL_WIDGET_MIN_WIDTH,
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
    contentConfig: Widget.getPropertyPaneContentConfig(),
    styleConfig: Widget.getPropertyPaneStyleConfig(),
    stylesheetConfig: Widget.getStylesheetConfig(),
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
            minHeight: "300px",
          };
        },
      },
    ],
  },
};

export default Widget;
