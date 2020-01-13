import {Injectable} from '@nestjs/common';

@Injectable()
export class TimestampService {
  now() {
    return new Date().getTime();
  }
}
