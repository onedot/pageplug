import type { ReactNode } from "react";
import React, { useMemo } from "react";
import {
  dbQueryIcon,
  ApiMethodIcon,
  EntityIcon,
  ENTITY_ICON_SIZE,
} from "../ExplorerIcons";
import { isGraphqlPlugin, PluginType } from "entities/Action";
import { generateReactKey } from "utils/generators";

import type { Plugin } from "api/PluginApi";
import { useSelector } from "react-redux";
import type { AppState } from "@appsmith/reducers";
import { groupBy } from "lodash";
import type { ActionData } from "reducers/entityReducers/actionsReducer";
import { getNextEntityName } from "utils/AppsmithUtils";
import {
  apiEditorIdURL,
  queryEditorIdURL,
  saasEditorApiIdURL,
} from "RouteBuilder";
import { getAssetUrl } from "@appsmith/utils/airgapHelpers";

// TODO [new_urls] update would break for existing paths
// using a common todo, this needs to be fixed
export type ActionGroupConfig = {
  groupName: string;
  types: PluginType[];
  icon: JSX.Element;
  key: string;
  getURL: (
    pageId: string,
    id: string,
    pluginType: PluginType,
    plugin?: Plugin,
  ) => string;
  getIcon: (action: any, plugin: Plugin, remoteIcon?: boolean) => ReactNode;
};

// When we have new action plugins, we can just add it to this map
// There should be no other place where we refer to the PluginType in entity explorer.
/*eslint-disable react/display-name */
export const ACTION_PLUGIN_MAP: Array<ActionGroupConfig | undefined> = [
  {
    groupName: "数据源",
    types: [PluginType.API, PluginType.SAAS, PluginType.DB, PluginType.REMOTE],
    icon: dbQueryIcon,
    key: generateReactKey(),
    getURL: (
      pageId: string,
      id: string,
      pluginType: PluginType,
      plugin?: Plugin,
    ) => {
      if (!!plugin && pluginType === PluginType.SAAS) {
        return saasEditorApiIdURL({
          pageId,
          pluginPackageName: plugin.packageName,
          apiId: id,
        });
      } else if (
        pluginType === PluginType.DB ||
        pluginType === PluginType.REMOTE
      ) {
        return queryEditorIdURL({
          pageId,
          queryId: id,
        });
      } else {
        return apiEditorIdURL({ pageId, apiId: id });
      }
    },
    getIcon: (action: any, plugin: Plugin, remoteIcon?: boolean) => {
      const isGraphql = isGraphqlPlugin(plugin);
      if (
        plugin &&
        plugin.type === PluginType.API &&
        !remoteIcon &&
        !isGraphql
      ) {
        const method = action?.actionConfiguration?.httpMethod;
        if (method) return ApiMethodIcon(method);
      }
      if (plugin && plugin.iconLocation)
        return (
          <EntityIcon
            height={`${ENTITY_ICON_SIZE}px`}
            width={`${ENTITY_ICON_SIZE}px`}
          >
            <img alt="entityIcon" src={getAssetUrl(plugin.iconLocation)} />
          </EntityIcon>
        );
      else if (plugin && plugin.type === PluginType.DB) return dbQueryIcon;
    },
  },
];

export const getActionConfig = (type: PluginType) =>
  ACTION_PLUGIN_MAP.find((configByType: ActionGroupConfig | undefined) =>
    configByType?.types.includes(type),
  );

export const useNewActionName = () => {
  // This takes into consideration only the current page widgets
  // If we're moving to a different page, there could be a widget
  // with the same name as the generated API name
  // TODO: Figure out how to handle this scenario
  const actions = useSelector((state: AppState) => state.entities.actions);
  const groupedActions = useMemo(() => {
    return groupBy(actions, "config.pageId");
  }, [actions]);
  return (
    name: string,
    destinationPageId: string,
    isCopyOperation?: boolean,
  ) => {
    const pageActions = groupedActions[destinationPageId];
    // Get action names of the destination page only
    const actionNames = pageActions
      ? pageActions.map((action: ActionData) => action.config.name)
      : [];

    return actionNames.indexOf(name) > -1
      ? getNextEntityName(
          isCopyOperation ? `${name}副本` : name,
          actionNames,
          true,
        )
      : name;
  };
};
