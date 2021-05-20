/*
    Copyright (C) 2017 Red Hat, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import { IParameter, ParametersDialog } from "../../UI";
import React, { ReactElement, useCallback, useState } from "react";

import { useToggle } from "../../Atlasmap/utils";

type ParametersCallback = (parameters: IParameter[]) => void;

export function useParametersDialog(
  title: string,
): [ReactElement, (cb: ParametersCallback, parameters?: IParameter[]) => void] {
  const [onParametersCb, setOnParametersCb] =
    useState<ParametersCallback | null>(null);
  const [parameters, setParameters] = useState<IParameter[]>([]);
  const { state, toggleOn, toggleOff } = useToggle(false);
  const onConfirm = useCallback(
    (parameters: IParameter[]) => {
      if (onParametersCb) {
        onParametersCb(parameters);
        toggleOff();
      }
    },
    [onParametersCb, toggleOff],
  );
  const dialog = (
    <ParametersDialog
      title={title}
      isOpen={state}
      onCancel={toggleOff}
      onConfirm={onConfirm}
      parameters={parameters}
    />
  );
  const onOpenParametersDialog = useCallback(
    (callback: ParametersCallback, parameters?: IParameter[]) => {
      setOnParametersCb(() => callback);
      if (parameters) {
        setParameters(parameters);
      }
      toggleOn();
    },
    [toggleOn],
  );
  return [dialog, onOpenParametersDialog];
}
