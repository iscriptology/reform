'use strict';

import React from 'react';
import {Label} from 'semantic-ui-react';
import TextPositionComponent from 'components/dashboard/position_components/TextPositionComponent';
import BooleanPositionComponent from 'components/dashboard/position_components/BooleanPositionComponent';

const fieldTypesGroups = ['Identity', 'Location', 'Date', 'General purpose'];
const fieldTypes = [
  [
    {
      label: 'Person Name',
      optionsComponent: <Label>Person Name</Label>,
      positionComponent: TextPositionComponent
    },
    {
      label: 'Gender',
      optionsComponent: <Label>Gender</Label>,
      positionComponent: BooleanPositionComponent
    },
    {
      label: 'Identity number',
      optionsComponent: <Label>Identity number</Label>,
      positionComponent: TextPositionComponent
    }
  ],
  [
    {
      label: 'Country',
      optionsComponent: <Label>Country</Label>
    },
    {
      label: 'City',
      optionsComponent: <Label>City</Label>
    },
    {
      label: 'Address',
      optionsComponent: <Label>Address</Label>
    }
  ],
  [
    {
      label: 'Birth Date',
      optionsComponent: <Label>Birth Date</Label>
    },
    {
      label: 'Date',
      optionsComponent: <Label>Date</Label>
    }
  ],
  [
    {
      label: 'Yes/No',
      optionsComponent: <Label>Yes/No</Label>
    },
    {
      label: 'Multiple Selection',
      optionsComponent: <Label>Multiple Selection</Label>
    },
    {
      label: 'Free Text',
      optionsComponent: <Label>Free Text</Label>
    }
  ]
];

export { fieldTypesGroups, fieldTypes }
