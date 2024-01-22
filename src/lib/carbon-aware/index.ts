// import axios from 'axios';

import { ModelParams } from '../../types/common';
import { ModelPluginInterface } from '../../interfaces';
import { buildErrorMessage } from '../../util/helpers';
import { ERRORS } from '../../util/errors';

const { InputValidationError, UnsupportedValueError } = ERRORS;


export class CarbonAwareModel implements ModelPluginInterface {
  name: string | undefined;
  staticParams: object | undefined = undefined;
  protected authParams: object | undefined;
  errorBuilder = buildErrorMessage(CarbonAwareModel);

  async authenticate(authParams: object) {
    console.log('#authenticate()');
    console.log(authParams);
    this.authParams = authParams;
  }

  async configure(staticParams: object | undefined = undefined): Promise<CarbonAwareModel> {
    this.validateInputs(staticParams);

    // Pring staticParams to console
    console.log('#configure()');
    console.log(staticParams);

    this.staticParams = staticParams;

    if (staticParams === undefined) {
      throw new Error('Required Parameters not provided');
    }
    return this;
  }

  async execute(inputs: ModelParams[]): Promise<ModelParams[]> {
    console.log('#execute()');
    console.log(inputs);

    // basic validation
    if (inputs === undefined) {
      throw new Error('Required Parameters not provided');
    } else if (!Array.isArray(inputs)) {
      throw new Error('inputs must be an array');
    }

    return [];
    // return inputs.map((input: KeyValuePair) => input);
  }

  private validateInputs(staticParams: object | undefined = undefined): void {
    if(staticParams === undefined) {
      throw new InputValidationError(
        this.errorBuilder({ message: 'Input data is missing' })
      );
    }

    // Check if required preferred-locations provided
    if(!('preferred-locations' in staticParams)) {
      throw new UnsupportedValueError(
        this.errorBuilder({
          message: 'Preferred locations are not provided',
          scope: 'configure',
        })
      );
    }

    // Check if required preferred-times provided
    if(!('preferred-times' in staticParams)) {
      throw new UnsupportedValueError(
        this.errorBuilder({
          message: 'Preferred times are not provided',
          scope: 'configure',
        })
      );
    }
  }
}