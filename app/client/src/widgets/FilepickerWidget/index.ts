import type { SnipingModeProperty, PropertyUpdates } from "widgets/constants";
import IconSVG from "./icon.svg";
import Widget from "./widget";
import FileDataTypes from "./widget/FileDataTypes";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "文件上传",
  iconSVG: IconSVG,
  searchTags: ["file picker"],
  needsMeta: true,
  hideCard: true,
  isDeprecated: true,
  replacement: "FILE_PICKER_WIDGET_V2",
  defaults: {
    rows: 4,
    files: [],
    selectedFiles: [],
    allowedFileTypes: [],
    label: "选择文件",
    columns: 16,
    maxNumFiles: 1,
    maxFileSize: 5,
    fileDataType: FileDataTypes.Base64,
    widgetName: "FilePicker",
    isDefaultClickDisabled: true,
    version: 1,
    isRequired: false,
    isDisabled: false,
    animateLoading: false,
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
    setterConfig: Widget.getSetterConfig(),
    autocompleteDefinitions: Widget.getAutocompleteDefinitions(),
  },
  methods: {
    getSnipingModeUpdates: (
      propValueMap: SnipingModeProperty,
    ): PropertyUpdates[] => {
      return [
        {
          propertyPath: "onFilesSelected",
          propertyValue: propValueMap.run,
          isDynamicPropertyPath: true,
        },
      ];
    },
  },
};

export default Widget;
