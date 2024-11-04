import { PassThrough } from 'stream';
import { createAcmeExampleAction } from './example';
import { BackstageCredentials } from '@backstage/backend-plugin-api';
import { JsonValue } from '@backstage/types';

describe('pipeline:azure', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call action', async () => {
    const action = createAcmeExampleAction();

    const logger = { info: jest.fn() };

    await action.handler({
      input: {
        repositoryName: 'test',
        repositoryId: 'test',
      },
      workspacePath: '/tmp',
      logger: logger as any,
      logStream: new PassThrough(),
      output: jest.fn(),
      createTemporaryDirectory() {
        // Usage of createMockDirectory is recommended for testing of filesystem operations
        throw new Error('Not implemented');
      },
      // eslint-disable-next-line func-names
      checkpoint: function <U extends JsonValue>(
        _key: string,
        _fn: () => Promise<U>,
      ): Promise<U> {
        throw new Error('Function not implemented.');
      },
      // eslint-disable-next-line func-names
      getInitiatorCredentials: function (): Promise<BackstageCredentials> {
        throw new Error('Function not implemented.');
      },
    });

    expect(logger.info).toHaveBeenCalledWith(
      'Running example template with parameters: test',
    );
  });
});
