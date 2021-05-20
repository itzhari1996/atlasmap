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
import { Button, Tooltip } from "@patternfly/react-core";
import React, { FunctionComponent } from "react";

import { TrashIcon } from "@patternfly/react-icons";

export interface IDeleteDocumentActionProps {
  id: string;
  onClick: () => void;
}
export const DeleteDocumentAction: FunctionComponent<IDeleteDocumentActionProps> =
  ({ id, onClick }) => (
    <Tooltip
      position={"auto"}
      enableFlip={true}
      content={<div>Remove instance or schema file</div>}
    >
      <Button
        variant="plain"
        onClick={onClick}
        aria-label="Remove instance or schema file"
        data-testid={`remove-${id}-instance-or-schema-file-button`}
      >
        <TrashIcon />
      </Button>
    </Tooltip>
  );
