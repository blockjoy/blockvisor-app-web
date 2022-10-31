import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';
import {
  Organization,
  ResponseMeta,
} from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { apiClient } from '@modules/client';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';

// used for generating mock member count
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isSuccess(response: ResponseMeta.AsObject) {
  return response.status === ResponseMeta.Status.SUCCESS;
}

export function useCreateOrganization() {
  const createOrganization = async (name: string) => {
    const organization = new Organization();
    const uuid = Math.random().toString();
    organization.setId(uuid);
    organization.setName(name);
    organization.setMemberCount(randomIntFromInterval(1, 100));

    const response = await apiClient.createOrganization(organization);

    if (isResponeMetaObject(response) && isSuccess(response)) {
      return;
    } else {
      throw new ApplicationError('CreateOrganization', 'Creation failed');
    }
  };

  return createOrganization;
}
