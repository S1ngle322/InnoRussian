import expressLoader from './expressLoader';
import mongooseLoader from "./mongooseLoader";
import log from '../utils/winston';

const runLoaders = async (app: any): Promise<void> => {
    await mongooseLoader();
    log.info('MongoDB loaded');
    await expressLoader(app);
    log.info('Express loaded');
};

export default runLoaders;