import { juryService } from '@/service/jury.service';
import { logger } from '@/utils';

export default async function judgement() {
  logger.info('----【风纪任务】----');
  try {
    const result = await juryService();
    if (result === false) {
      logger.error('风纪任务未完成 x_x');
      return;
    }
    logger.info('风纪任务完成 √');
  } catch (error) {
    logger.error(`风纪任务未完成 ×: ${error.message}`);
  }
}
