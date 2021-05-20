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
import { ReactElement, useCallback } from "react";

import { useAtlasmap } from "../AtlasmapProvider";
import { useConfirmationDialog } from "./useConfirmationDialog";

export function useDeleteConstantDialog(): [
  ReactElement,
  (constValue: string) => void,
] {
  const { deleteConstant } = useAtlasmap();
  const [deleteConstantDialog, openDeleteConstantDialog] =
    useConfirmationDialog(
      "Delete constant?",
      "Are you sure you want to delete the selected constant and remove any associated mapping references?",
    );
  const onDeleteConstant = useCallback(
    (constValue: string) =>
      openDeleteConstantDialog(() => deleteConstant(constValue)),
    [deleteConstant, openDeleteConstantDialog],
  );
  return [deleteConstantDialog, onDeleteConstant];
}
