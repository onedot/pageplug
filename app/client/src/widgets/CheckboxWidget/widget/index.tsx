import { LabelPosition } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import type { WidgetType } from "constants/WidgetConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import React from "react";
import { isAutoLayout } from "utils/autoLayout/flexWidgetUtils";
import type { DerivedPropertiesMap } from "utils/WidgetFactory";
import { AlignWidgetTypes } from "widgets/constants";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
} from "widgets/WidgetUtils";
import type { WidgetProps, WidgetState } from "../../BaseWidget";
import BaseWidget from "../../BaseWidget";
import CheckboxComponent from "../component";
import type { AutocompletionDefinitions } from "widgets/constants";

class CheckboxWidget extends BaseWidget<CheckboxWidgetProps, WidgetState> {
  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        "Checkbox is a simple UI widget you can use when you want users to make a binary choice",
      "!url": "https://docs.appsmith.com/widget-reference/checkbox",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      isChecked: "bool",
      isDisabled: "bool",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: "标签",
        children: [
          {
            propertyName: "label",
            label: "文本",
            controlType: "INPUT_TEXT",
            helpText: "组件旁的标签",
            placeholderText: "我同意这门亲事",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: "设置组件标签位置",
            propertyName: "labelPosition",
            label: "位置",
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              { label: "左", value: LabelPosition.Left },
              { label: "右", value: LabelPosition.Right },
            ],
            defaultValue: LabelPosition.Left,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "alignWidget",
            helpText: "设置组件对齐方式",
            label: "对齐",
            controlType: "LABEL_ALIGNMENT_OPTIONS",
            isBindProperty: true,
            isTriggerProperty: false,
            fullWidth: false,
            options: [
              {
                startIcon: "align-left",
                value: AlignWidgetTypes.LEFT,
              },
              {
                startIcon: "align-right",
                value: AlignWidgetTypes.RIGHT,
              },
            ],
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: "校验",
        children: [
          {
            propertyName: "isRequired",
            label: "必填",
            helpText: "强制用户填写",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: "基本属性",
        children: [
          {
            propertyName: "defaultCheckedState",
            label: "默认选中",
            helpText: "设置组件是否默认选中",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isVisible",
            label: "是否显示",
            helpText: "控制组件的显示/隐藏",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: "禁用",
            controlType: "SWITCH",
            helpText: "让组件不可交互",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: "加载时显示动画",
            controlType: "SWITCH",
            helpText: "组件依赖的数据加载时显示加载动画",
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: "事件",
        children: [
          {
            helpText: "选中态改变时触发",
            propertyName: "onCheckChange",
            label: "onCheckChange",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: "标签样式",
        children: [
          {
            propertyName: "labelTextColor",
            label: "字体颜色",
            helpText: "设置标签字体颜色",
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
          },
          {
            propertyName: "labelTextSize",
            label: "字体大小",
            helpText: "设置标签字体大小",
            controlType: "DROP_DOWN",
            defaultValue: "0.875rem",
            hidden: isAutoLayout,
            options: [
              {
                label: "S",
                value: "0.875rem",
                subText: "0.875rem",
              },
              {
                label: "M",
                value: "1rem",
                subText: "1rem",
              },
              {
                label: "L",
                value: "1.25rem",
                subText: "1.25rem",
              },
              {
                label: "XL",
                value: "1.875rem",
                subText: "1.875rem",
              },
              {
                label: "XXL",
                value: "3rem",
                subText: "3rem",
              },
              {
                label: "3XL",
                value: "3.75rem",
                subText: "3.75rem",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelStyle",
            label: "强调",
            helpText: "设置标签字体是否加粗或斜体",
            controlType: "BUTTON_GROUP",
            options: [
              {
                icon: "text-bold",
                value: "BOLD",
              },
              {
                icon: "text-italic",
                value: "ITALIC",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: "颜色配置",
        children: [
          {
            propertyName: "accentColor",
            helpText: "设置勾选框选中态颜色",
            label: "强调色",
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: "轮廓样式",
        children: [
          {
            propertyName: "borderRadius",
            label: "边框圆角",
            helpText: "边框圆角样式",
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      isChecked: "defaultCheckedState",
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      value: `{{!!this.isChecked}}`,
      isValid: `{{ this.isRequired ? !!this.isChecked : true }}`,
    };
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return {
      isChecked: undefined,
      isDirty: false,
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    };
  }

  componentDidUpdate(prevProps: CheckboxWidgetProps) {
    if (
      this.props.defaultCheckedState !== prevProps.defaultCheckedState &&
      this.props.isDirty
    ) {
      this.props.updateWidgetMetaProperty("isDirty", false);
    }
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setDisabled: {
          path: "isDisabled",
          type: "boolean",
        },
        setRequired: {
          path: "isRequired",
          type: "boolean",
        },
        setValue: {
          path: "defaultCheckedState",
          type: "boolean",
          accessor: "isChecked",
        },
      },
    };
  }

  getPageView() {
    return (
      <CheckboxComponent
        accentColor={this.props.accentColor}
        alignWidget={this.props.alignWidget}
        borderRadius={this.props.borderRadius}
        isChecked={!!this.props.isChecked}
        isDisabled={this.props.isDisabled}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        isLabelInline={this.isAutoLayoutMode}
        isLoading={this.props.isLoading}
        isRequired={this.props.isRequired}
        key={this.props.widgetId}
        label={this.props.label}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        minHeight={this.props.minHeight}
        onCheckChange={this.onCheckChange}
        widgetId={this.props.widgetId}
      />
    );
  }

  onCheckChange = (isChecked: boolean) => {
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    this.props.updateWidgetMetaProperty("isChecked", isChecked, {
      triggerPropertyName: "onCheckChange",
      dynamicString: this.props.onCheckChange,
      event: {
        type: EventType.ON_CHECK_CHANGE,
      },
    });
  };

  static getWidgetType(): WidgetType {
    return "CHECKBOX_WIDGET";
  }
}

export interface CheckboxWidgetProps extends WidgetProps {
  label: string;
  defaultCheckedState: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
  onCheckChange?: string;
  isRequired?: boolean;
  accentColor: string;
  borderRadius: string;
  alignWidget: AlignWidgetTypes;
  labelPosition: LabelPosition;
  labelTextColor?: string;
  labelTextSize?: string;
  labelStyle?: string;
}

export default CheckboxWidget;
