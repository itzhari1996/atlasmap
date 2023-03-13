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
import { AtlasmapProvider, IAtlasmapProviderProps } from './AtlasmapProvider';
import { boolean, text } from '@storybook/addon-knobs';

import { Atlasmap } from './Atlasmap';
import React from 'react';

const sampleExternalDocument = {
  documentId: 'i-M5XxdCeWJ837juDzeM3z',
  initialMappings: '',
  inputDocuments: [
    {
      description: 'this is input',
      id: '984792308230-input',
      name: 'Comments JSON instance',
      inspectionResult:
        '{"JsonInspectionResponse":{"jsonType":"io.atlasmap.json.v2.JsonInspectionResponse","jsonDocument":{"jsonType":"io.atlasmap.json.v2.JsonDocument","fields":{"field":[{"jsonType":"io.atlasmap.json.v2.JsonComplexType","path":"/address","status":"SUPPORTED","fieldType":"COMPLEX","name":"address","jsonFields":{"jsonField":[{"jsonType":"io.atlasmap.json.v2.JsonComplexType","path":"/address/geo","status":"SUPPORTED","fieldType":"COMPLEX","name":"geo","jsonFields":{"jsonField":[{"jsonType":"io.atlasmap.json.v2.JsonField","value":"","path":"/address/geo/latitude","status":"SUPPORTED","fieldType":"STRING","name":"latitude"}]}}]}}]}},"executionTime":1}}',
      showFields: true,
      documentType: 'JSON',
      inspectionType: 'INSTANCE',
    },
  ],
  outputDocument: {
    description: 'this is output',
    id: '984792308230-output',
    name: 'Comments JSON instance',
    inspectionResult:
      '{"JsonInspectionResponse":{"jsonType":"io.atlasmap.json.v2.JsonInspectionResponse","jsonDocument":{"jsonType":"io.atlasmap.json.v2.JsonDocument","fields":{"field":[{"jsonType":"io.atlasmap.json.v2.JsonComplexType","path":"/pegaaddress_1DF","status":"SUPPORTED","fieldType":"COMPLEX","name":"pegaaddress_1DF","jsonFields":{"jsonField":[{"jsonType":"io.atlasmap.json.v2.JsonComplexType","path":"/pegaaddress_1DF/PGeo_1DF","status":"SUPPORTED","fieldType":"COMPLEX","name":"PGeo_1DF","jsonFields":{"jsonField":[{"jsonType":"io.atlasmap.json.v2.JsonField","value":"","path":"/pegaaddress_1DF/PGeo_1DF/PLat_1DF","status":"SUPPORTED","fieldType":"STRING","name":"PLat_1DF"}]}}]}}]}},"executionTime":0}}',
    showFields: true,
    documentType: 'JSON',
    inspectionType: 'INSTANCE',
  },
};

const obj = {
  title: 'AtlasMap|Demo',
};
export default obj;

export const wiredToTheBackend = () => (
  <AtlasmapProvider
    baseJavaInspectionServiceUrl=""
    baseXMLInspectionServiceUrl=""
    baseJSONInspectionServiceUrl="http://localhost:8585/v2/atlas/json/"
    baseCSVInspectionServiceUrl=""
    baseMappingServiceUrl="http://localhost:8585/v2/atlas/"
    logLevel={text('logLevel', 'info')}
    externalDocument={
      sampleExternalDocument as IAtlasmapProviderProps['externalDocument']
    }
    onMappingChange={(mapping) => console.log(mapping)}
  >
    <Atlasmap
      allowImport={boolean('allow Import', true)}
      allowExport={boolean('allow Export', false)}
      allowReset={boolean('allow Reset', false)}
      allowDelete={boolean('allow Delete', true)}
      allowCustomJavaClasses={boolean('allow Custom Java Classes', false)}
      toolbarOptions={{
        showToggleMappingPreviewToolbarItem: boolean(
          'showToggleMappingPreviewToolbarItem',
          false,
        ),
        showMappingTableViewToolbarItem: boolean(
          'showToggleMappingTableToolbarItem',
          false,
        ),
        showNamespaceTableViewToolbarItem: boolean(
          'showToggleNamespaceTableToolbarItem',
          false,
        ),
        showToggleTypesToolbarItem: boolean(
          'showToggleTypesToolbarItem',
          false,
        ),
        showToggleMappedFieldsToolbarItem: boolean(
          'showToggleMappedFieldsToolbarItem',
          true,
        ),
        showToggleUnmappedFieldsToolbarItem: boolean(
          'showToggleUnmappedFieldsToolbarItem',
          true,
        ),
      }}
    />
  </AtlasmapProvider>
);
