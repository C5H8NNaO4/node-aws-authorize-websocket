/* eslint camelcase: off */
import { getPayload } from 'node-aws-verify-jwt';
import { generatePolicy } from './util';

export const HandleAuth = config => async (event) => {
  const {
    userPoolID, appClientID,
  } = config;
  const { queryStringParameters, requestContext, methodArn } = event;
  const { domainName } = requestContext;
  const { Auth } = queryStringParameters;

  try {
    const [,, region] = domainName.split('.');
    const { sub, client_id } = await getPayload({
      jwtToken: Auth,
      region,
      userPoolID,
    });

    if (client_id !== appClientID) {
      return generatePolicy(sub, 'Deny', methodArn);
    }

    return generatePolicy(sub, 'Allow', methodArn);
  } catch (e) {
    throw new Error('Unauthorized');
  }
};
