import { container } from 'tsyringe';

import IStoreProvider from './StoreProvider/models/IStoreProvider';
import DiskStoreProvider from './StoreProvider/implementations/DiskStoreProvider';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

container.registerSingleton<IStoreProvider>('StoreProvider', DiskStoreProvider);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
