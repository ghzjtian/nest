import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('transcode')
  async handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    await this.sleep(10 * 1000);
    this.logger.debug('Transcoding completed');
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
