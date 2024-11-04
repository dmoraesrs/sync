import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { PipelineResponse } from './types';

/**
 * Creates an `pipeline:azure` Scaffolder action.
 *
 * @remarks
 *
 * See {@link https://example.com} for more information.
 *
 * @public
 */
export function createAcmeExampleAction() {
  // For more information on how to define custom actions, see
  //   https://backstage.io/docs/features/software-templates/writing-custom-actions
  return createTemplateAction<{
    repositoryName: string;
    repositoryId: string;
  }>({
    id: 'pipeline:azure',
    description: 'Creates an Azure DevOps pipeline for the repository',
    schema: {
      input: {
        type: 'object',
        required: ['repositoryName', 'repositoryId'],
        properties: {
          repositoryName: {
            title: 'Repo Name',
            description: 'The name of the created repository',
            type: 'string',
          },
          repositoryId: {
            title: 'Repo Id',
            description: 'The ID of the created repository',
            type: 'string',
          },
        },
      },
    },
    async handler(ctx) {
      // const PAT = process.env.AZURE_DEVOPS_PAT;

      const repositoryName = ctx.input.repositoryName;
      const repositoryId = ctx.input.repositoryId;


      ctx.logger.info(
        `Creating and Azure pipeline for the repository ${repositoryName} with the ID ${repositoryId}`,
      );

      const createPipelineHeaders = new Headers();
      createPipelineHeaders.append('Content-Type', 'application/json');
      createPipelineHeaders.append(
        'Authorization',
        'Basic UEFUOnF0Y3RwNWN1Nm9hcDc2cTdvcGRrcWlvZzM2M3VzNnFtN2pudmZlY3Ftemo0bnh1ejdkaHE=',
      );

      const createPipelineBodyRaw = JSON.stringify({
        name: repositoryName,
        folder: null,
        configuration: {
          type: 'yaml',
          path: '/azure-pipelines.yml',
          repository: {
            id: repositoryId,
            name: repositoryName,
            type: 'azureReposGit',
          },
        },
      });

      const createPipelineRequestOptions: RequestInit = {
        method: 'POST',
        headers: createPipelineHeaders,
        body: createPipelineBodyRaw,
        redirect: 'follow' as RequestRedirect,
      };

      const createPipeline = await fetch(
        'https://devops.mercantil.com.br/Tecnologia_MB/MB/_apis/pipelines?api-version=7.0',
        createPipelineRequestOptions,
      );

      if (!createPipeline.ok) {
        createPipeline.text().then(ctx.logger.error);

        throw new Error(
          `Failed to create pipeline for repository ${repositoryName}`,
        );
      }

      const createPipelineResponse: PipelineResponse =
        await createPipeline.json();

      ctx.logger.info('Response from Azure DevOps Create Pipeline');
      ctx.logger.info(createPipelineResponse);

      const runPipelineHeaders = new Headers();
      runPipelineHeaders.append('Content-Type', 'application/json');
      runPipelineHeaders.append(
        'Authorization',
        'Basic UEFUOnF0Y3RwNWN1Nm9hcDc2cTdvcGRrcWlvZzM2M3VzNnFtN2pudmZlY3Ftemo0bnh1ejdkaHE=',
      );

      const runPipelineRaw = JSON.stringify({});

      const runPipelineRequestOptions: RequestInit = {
        method: 'POST',
        headers: runPipelineHeaders,
        body: runPipelineRaw,
        redirect: 'follow' as RequestRedirect,
      };

      const runPipeline = await fetch(
        `https://devops.mercantil.com.br/Tecnologia_MB/MB/_apis/pipelines/${createPipelineResponse.id}/runs?api-version=7.0`,
        runPipelineRequestOptions,
      );

      if (!runPipeline.ok) {
        runPipeline.text().then(ctx.logger.error);

        throw new Error(
          `Failed to run pipeline for repository ${repositoryName}`,
        );
      }

      const runPipelineResponse = await runPipeline.json();

      ctx.logger.info('Response from Azure DevOps Run Pipeline');
      ctx.logger.info(runPipelineResponse);

      // Simulate a long running task
      // await new Promise(resolve => setTimeout(resolve, 1000));
    },
  });
}
