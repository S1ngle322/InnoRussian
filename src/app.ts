import express from 'express';
import log from './utils/winston';

const startServer = async (): Promise<void> => {
    const app = express();
    app.set('port', process.env.PORT || 3000);
    const host = '0.0.0.0';

    app.listen(app.get('port'), host, () => {
        log.info(
            'App is running at http://localhost:3000 in %s mode',
            app.get('port'),
            app.get('env')
        );
        log.info('Press CTRL-C to stop!\n');
    });
};

startServer();