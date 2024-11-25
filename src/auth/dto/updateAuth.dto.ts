import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './createAuth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
