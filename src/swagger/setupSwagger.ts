import { INestApplication } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = async (app: INestApplication) => {
  const yamlPath = resolve(__dirname, '../../doc/api.yaml');
  const yamlContents = await readFile(yamlPath, 'utf-8');

  const options = parse(yamlContents);

  SwaggerModule.setup('doc', app, options);
};
